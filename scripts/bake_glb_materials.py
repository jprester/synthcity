"""
Blender Material Baking Script for GLB Models
==============================================

This script automates the process of baking multiple materials in a GLB model
into a single material with texture atlases.

USAGE:
1. Open Blender
2. Go to Scripting workspace (or open a Text Editor panel)
3. Click "Open" and load this script
4. Edit the CONFIG section below with your file paths
5. Click "Run Script" (or press Alt+P)

The script will:
- Import your GLB
- Create new UV layout for baking (Smart UV Project)
- Bake all PBR channels to textures
- Create a new combined material
- Join all meshes
- Export a new GLB

REQUIREMENTS:
- Blender 3.0+ (tested on 3.6 and 4.0)
- Cycles renderer (comes with Blender)
"""

import bpy
import os

# =============================================================================
# CONFIGURATION - EDIT THESE VALUES
# =============================================================================

CONFIG = {
    # Input GLB file path
    "input_file": "/Users/jankoprester/Projects/software_dev/collab/synthcity-2026_fork/public/assets/models/dark-skyscraper2.glb",

    # Output GLB file path (baked version)
    "output_file": "/Users/jankoprester/Projects/software_dev/collab/synthcity-2026_fork/public/assets/models/dark-skyscraper2-baked.glb",

    # Output texture directory (textures will be saved here)
    "texture_dir": "/Users/jankoprester/Projects/software_dev/collab/synthcity-2026_fork/public/assets/models/baked_textures",

    # Texture resolution (power of 2: 512, 1024, 2048, 4096)
    # Using 1024 for smaller file size (~2MB target for GLB)
    "texture_size": 1024,

    # Bake margin (pixels) - prevents seam bleeding
    "bake_margin": 2,

    # UV island margin for Smart UV Project
    "uv_island_margin": 0.02,

    # Bake samples (higher = better quality but slower)
    "bake_samples": 64,

    # Which maps to bake
    "bake_diffuse": True,
    "bake_roughness": True,
    "bake_metallic": True,
    "bake_normal": True,
    "bake_emissive": True,

    # JPEG quality for diffuse/roughness (0-100), PNG used for others
    "jpeg_quality": 85,

    # Materials that SHOULD have emission (whitelist approach - only these will glow)
    # Add material names (or partial names) that should emit light
    "emissive_materials": ["windows", "red-light"],
}

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def clear_scene():
    """Remove all objects from the scene"""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

    # Clear orphan data
    for block in bpy.data.meshes:
        if block.users == 0:
            bpy.data.meshes.remove(block)
    for block in bpy.data.materials:
        if block.users == 0:
            bpy.data.materials.remove(block)
    for block in bpy.data.images:
        if block.users == 0:
            bpy.data.images.remove(block)

def import_glb(filepath):
    """Import GLB file and return imported objects"""
    # Get objects before import
    before = set(bpy.data.objects)

    bpy.ops.import_scene.gltf(filepath=filepath)

    # Get newly imported objects
    after = set(bpy.data.objects)
    imported = after - before

    return list(imported)

def get_all_mesh_objects(objects):
    """Get all mesh objects from a list (including children)"""
    meshes = []
    for obj in objects:
        if obj.type == 'MESH':
            meshes.append(obj)
        for child in obj.children_recursive:
            if child.type == 'MESH':
                meshes.append(child)
    return meshes

def create_bake_uv_map(obj, uv_name="BakeUV"):
    """Create a new UV map for baking using Smart UV Project"""
    # Make sure object is selected and active
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj

    # Create new UV map
    if uv_name in obj.data.uv_layers:
        obj.data.uv_layers.remove(obj.data.uv_layers[uv_name])

    uv_layer = obj.data.uv_layers.new(name=uv_name)
    uv_layer.active = True
    obj.data.uv_layers.active = uv_layer

    # Enter edit mode and select all
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')

    # Smart UV Project
    bpy.ops.uv.smart_project(
        angle_limit=66.0,
        island_margin=CONFIG["uv_island_margin"],
        area_weight=0.0,
        correct_aspect=True,
        scale_to_bounds=True
    )

    bpy.ops.object.mode_set(mode='OBJECT')

    return uv_layer

def create_bake_image(name, size, is_data=False, is_float=False):
    """Create a new image for baking"""
    # Remove existing image with same name
    if name in bpy.data.images:
        bpy.data.images.remove(bpy.data.images[name])

    image = bpy.data.images.new(
        name=name,
        width=size,
        height=size,
        alpha=True,
        float_buffer=is_float,
        is_data=is_data
    )

    # Fill with appropriate default color
    if "normal" in name.lower():
        # Normal map default (flat normal pointing up)
        image.pixels[:] = [0.5, 0.5, 1.0, 1.0] * (size * size)
    elif "roughness" in name.lower():
        # Default roughness
        image.pixels[:] = [0.5, 0.5, 0.5, 1.0] * (size * size)
    elif "metallic" in name.lower():
        # Default non-metallic
        image.pixels[:] = [0.0, 0.0, 0.0, 1.0] * (size * size)
    elif "emissive" in name.lower():
        # Default no emission
        image.pixels[:] = [0.0, 0.0, 0.0, 1.0] * (size * size)
    else:
        # Default gray for diffuse
        image.pixels[:] = [0.5, 0.5, 0.5, 1.0] * (size * size)

    return image

def setup_bake_node(material, image):
    """Add an image texture node to material for baking target"""
    if not material.use_nodes:
        material.use_nodes = True

    nodes = material.node_tree.nodes

    # Create image texture node
    tex_node = nodes.new('ShaderNodeTexImage')
    tex_node.name = "BakeTarget"
    tex_node.image = image
    tex_node.select = True
    nodes.active = tex_node

    return tex_node

def remove_bake_nodes(material):
    """Remove bake target nodes from material"""
    if not material.use_nodes:
        return

    nodes = material.node_tree.nodes
    to_remove = [n for n in nodes if n.name == "BakeTarget"]
    for node in to_remove:
        nodes.remove(node)

def setup_cycles_bake():
    """Configure Cycles for baking"""
    bpy.context.scene.render.engine = 'CYCLES'

    # Use GPU if available
    bpy.context.scene.cycles.device = 'GPU'

    # Bake settings
    bpy.context.scene.cycles.samples = CONFIG["bake_samples"]
    bpy.context.scene.render.bake.margin = CONFIG["bake_margin"]
    bpy.context.scene.render.bake.use_clear = True
    bpy.context.scene.render.bake.use_selected_to_active = False

def is_emissive_material(mat_name):
    """Check if material SHOULD have emission based on whitelist"""
    mat_name_lower = mat_name.lower()
    for keyword in CONFIG.get("emissive_materials", []):
        if keyword.lower() in mat_name_lower:
            return True
    return False

def clear_emission_from_material(mat):
    """Remove emission from a material"""
    if not mat or not mat.use_nodes:
        return

    nodes = mat.node_tree.nodes
    links = mat.node_tree.links

    for node in nodes:
        if node.type == 'BSDF_PRINCIPLED':
            # Clear emission color to black
            emission_input = node.inputs.get('Emission Color') or node.inputs.get('Emission')
            strength_input = node.inputs.get('Emission Strength')

            if emission_input:
                # Disconnect any links
                for link in list(emission_input.links):
                    links.remove(link)
                # Set to black
                if hasattr(emission_input, 'default_value'):
                    emission_input.default_value = (0, 0, 0, 1)

            if strength_input:
                strength_input.default_value = 0.0

        elif node.type == 'EMISSION':
            # Set emission shader strength to 0
            strength_input = node.inputs.get('Strength')
            if strength_input:
                strength_input.default_value = 0.0

def prepare_emissive_for_bake(obj):
    """
    Prepare materials for emissive baking:
    - Only materials in the whitelist will have emission
    - All other materials get their emission cleared
    """
    for slot in obj.material_slots:
        mat = slot.material
        if not mat or not mat.use_nodes:
            continue

        mat_name = mat.name

        # Check if this material SHOULD be emissive (whitelist)
        if is_emissive_material(mat_name):
            print(f"      KEEPING emission in: {mat_name}")
            # Boost emission strength if needed
            nodes = mat.node_tree.nodes
            for node in nodes:
                if node.type == 'BSDF_PRINCIPLED':
                    strength_input = node.inputs.get('Emission Strength')
                    if strength_input and strength_input.default_value < 1.0:
                        strength_input.default_value = 1.0
                elif node.type == 'EMISSION':
                    strength_input = node.inputs.get('Strength')
                    if strength_input and strength_input.default_value < 1.0:
                        strength_input.default_value = 1.0
        else:
            # Not in whitelist - clear all emission
            print(f"      Clearing emission from: {mat_name}")
            clear_emission_from_material(mat)

def bake_channel(objects, image, bake_type, **kwargs):
    """Bake a specific channel to image"""
    # Setup bake target node in all materials
    for obj in objects:
        for slot in obj.material_slots:
            if slot.material:
                setup_bake_node(slot.material, image)

    # Select objects
    bpy.ops.object.select_all(action='DESELECT')
    for obj in objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]

    # Perform bake
    bpy.ops.object.bake(type=bake_type, **kwargs)

    # Clean up bake nodes
    for obj in objects:
        for slot in obj.material_slots:
            if slot.material:
                remove_bake_nodes(slot.material)

def save_image(image, filepath, use_jpeg=False, quality=85):
    """Save image to file (PNG or JPEG)"""
    if use_jpeg:
        # Change extension to jpg
        filepath = os.path.splitext(filepath)[0] + ".jpg"
        image.filepath_raw = filepath
        image.file_format = 'JPEG'
        bpy.context.scene.render.image_settings.quality = quality
    else:
        image.filepath_raw = filepath
        image.file_format = 'PNG'
    image.save()
    return filepath

def create_baked_material(name, images, size):
    """Create a new material using the baked textures"""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True

    nodes = mat.node_tree.nodes
    links = mat.node_tree.links

    # Clear default nodes
    nodes.clear()

    # Create output and BSDF
    output = nodes.new('ShaderNodeOutputMaterial')
    output.location = (400, 0)

    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.location = (0, 0)

    links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])

    # Add UV map node (use the bake UV)
    uv_node = nodes.new('ShaderNodeUVMap')
    uv_node.uv_map = "BakeUV"
    uv_node.location = (-800, 0)

    y_offset = 300
    x_offset = -400

    # Connect textures
    if "diffuse" in images:
        tex = nodes.new('ShaderNodeTexImage')
        tex.image = images["diffuse"]
        tex.location = (x_offset, y_offset)
        links.new(uv_node.outputs['UV'], tex.inputs['Vector'])
        links.new(tex.outputs['Color'], bsdf.inputs['Base Color'])
        y_offset -= 300

    if "roughness" in images:
        tex = nodes.new('ShaderNodeTexImage')
        tex.image = images["roughness"]
        tex.image.colorspace_settings.name = 'Non-Color'
        tex.location = (x_offset, y_offset)
        links.new(uv_node.outputs['UV'], tex.inputs['Vector'])
        links.new(tex.outputs['Color'], bsdf.inputs['Roughness'])
        y_offset -= 300

    if "metallic" in images:
        tex = nodes.new('ShaderNodeTexImage')
        tex.image = images["metallic"]
        tex.image.colorspace_settings.name = 'Non-Color'
        tex.location = (x_offset, y_offset)
        links.new(uv_node.outputs['UV'], tex.inputs['Vector'])
        links.new(tex.outputs['Color'], bsdf.inputs['Metallic'])
        y_offset -= 300

    if "normal" in images:
        tex = nodes.new('ShaderNodeTexImage')
        tex.image = images["normal"]
        tex.image.colorspace_settings.name = 'Non-Color'
        tex.location = (x_offset, y_offset)

        normal_map = nodes.new('ShaderNodeNormalMap')
        normal_map.location = (x_offset + 300, y_offset)

        links.new(uv_node.outputs['UV'], tex.inputs['Vector'])
        links.new(tex.outputs['Color'], normal_map.inputs['Color'])
        links.new(normal_map.outputs['Normal'], bsdf.inputs['Normal'])
        y_offset -= 300

    if "emissive" in images:
        tex = nodes.new('ShaderNodeTexImage')
        tex.image = images["emissive"]
        tex.location = (x_offset, y_offset)
        links.new(uv_node.outputs['UV'], tex.inputs['Vector'])
        links.new(tex.outputs['Color'], bsdf.inputs['Emission Color'])
        bsdf.inputs['Emission Strength'].default_value = 1.0

    return mat

def join_meshes(objects):
    """Join multiple mesh objects into one"""
    if len(objects) < 2:
        return objects[0] if objects else None

    bpy.ops.object.select_all(action='DESELECT')

    for obj in objects:
        obj.select_set(True)

    bpy.context.view_layer.objects.active = objects[0]
    bpy.ops.object.join()

    return bpy.context.active_object

def export_glb(filepath, objects):
    """Export objects to GLB with compressed textures"""
    bpy.ops.object.select_all(action='DESELECT')
    for obj in objects:
        obj.select_set(True)

    bpy.ops.export_scene.gltf(
        filepath=filepath,
        use_selection=True,
        export_format='GLB',
        export_texcoords=True,
        export_normals=True,
        export_materials='EXPORT',
        # Use JPEG for smaller file size (WEBP not always supported)
        export_image_format='JPEG',
        export_image_quality=75,
    )

# =============================================================================
# MAIN BAKING PROCESS
# =============================================================================

def main():
    print("\n" + "="*60)
    print("GLB Material Baking Script")
    print("="*60 + "\n")

    # Ensure texture output directory exists
    os.makedirs(CONFIG["texture_dir"], exist_ok=True)

    # Step 1: Clear scene and import GLB
    print("[1/9] Clearing scene and importing GLB...")
    clear_scene()
    imported = import_glb(CONFIG["input_file"])
    mesh_objects = get_all_mesh_objects(imported)

    if not mesh_objects:
        print("ERROR: No mesh objects found in GLB!")
        return

    print(f"      Found {len(mesh_objects)} mesh object(s)")
    for obj in mesh_objects:
        mat_names = [slot.material.name if slot.material else "None"
                     for slot in obj.material_slots]
        print(f"      - {obj.name}: materials = {mat_names}")

    # Step 2: Apply transforms
    print("\n[2/9] Applying transforms...")
    for obj in mesh_objects:
        bpy.ops.object.select_all(action='DESELECT')
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

    # Step 3: Join meshes first (so we get unified UV layout)
    print("\n[3/9] Joining meshes...")
    joined_obj = join_meshes(mesh_objects)
    print(f"      Joined into: {joined_obj.name}")

    # Step 4: Create bake UV map
    print("\n[4/9] Creating bake UV map (Smart UV Project)...")
    create_bake_uv_map(joined_obj, "BakeUV")
    print("      UV map created: BakeUV")

    # Step 5: Setup Cycles
    print("\n[5/9] Setting up Cycles renderer...")
    setup_cycles_bake()

    # Step 6: Create bake images
    print("\n[6/9] Creating bake target images...")
    size = CONFIG["texture_size"]
    images = {}

    if CONFIG["bake_diffuse"]:
        images["diffuse"] = create_bake_image("Bake_Diffuse", size, is_data=False)
        print(f"      Created: Bake_Diffuse ({size}x{size})")

    if CONFIG["bake_roughness"]:
        images["roughness"] = create_bake_image("Bake_Roughness", size, is_data=True)
        print(f"      Created: Bake_Roughness ({size}x{size})")

    if CONFIG["bake_metallic"]:
        images["metallic"] = create_bake_image("Bake_Metallic", size, is_data=True)
        print(f"      Created: Bake_Metallic ({size}x{size})")

    if CONFIG["bake_normal"]:
        images["normal"] = create_bake_image("Bake_Normal", size, is_data=True)
        print(f"      Created: Bake_Normal ({size}x{size})")

    if CONFIG["bake_emissive"]:
        images["emissive"] = create_bake_image("Bake_Emissive", size, is_data=False)
        print(f"      Created: Bake_Emissive ({size}x{size})")

    # Step 7: Bake all channels
    print("\n[7/9] Baking textures (this may take a while)...")

    # Prepare emissive materials - clear non-emissive, boost actual lights
    if CONFIG["bake_emissive"]:
        print("      Preparing emissive materials...")
        prepare_emissive_for_bake(joined_obj)

    if CONFIG["bake_diffuse"]:
        print("      Baking diffuse...")
        bake_channel([joined_obj], images["diffuse"], 'DIFFUSE',
                     pass_filter={'COLOR'})

    if CONFIG["bake_roughness"]:
        print("      Baking roughness...")
        bake_channel([joined_obj], images["roughness"], 'ROUGHNESS')

    if CONFIG["bake_metallic"]:
        print("      Baking metallic (glossy)...")
        bake_channel([joined_obj], images["metallic"], 'GLOSSY',
                     pass_filter={'COLOR'})

    if CONFIG["bake_normal"]:
        print("      Baking normals...")
        bake_channel([joined_obj], images["normal"], 'NORMAL')

    if CONFIG["bake_emissive"]:
        print("      Baking emissive...")
        bake_channel([joined_obj], images["emissive"], 'EMIT')

    # Step 8: Save images and create new material
    print("\n[8/9] Saving textures and creating baked material...")

    base_name = os.path.splitext(os.path.basename(CONFIG["output_file"]))[0]

    # Use JPEG for color textures (smaller files), PNG for data textures
    jpeg_quality = CONFIG.get("jpeg_quality", 85)
    for channel, image in images.items():
        filepath = os.path.join(CONFIG["texture_dir"], f"{base_name}_{channel}.png")
        # Use JPEG for diffuse and roughness (color data, lossy OK)
        # Use PNG for normal, metallic, emissive (need precision)
        use_jpeg = channel in ["diffuse", "roughness"]
        saved_path = save_image(image, filepath, use_jpeg=use_jpeg, quality=jpeg_quality)
        print(f"      Saved: {saved_path}")

    # Create new material with baked textures
    baked_mat = create_baked_material("BakedMaterial", images, size)

    # Assign to object
    joined_obj.data.materials.clear()
    joined_obj.data.materials.append(baked_mat)
    print(f"      Created and assigned material: {baked_mat.name}")

    # Step 9: Export
    print("\n[9/9] Exporting baked GLB...")
    export_glb(CONFIG["output_file"], [joined_obj])
    print(f"      Exported: {CONFIG['output_file']}")

    print("\n" + "="*60)
    print("BAKING COMPLETE!")
    print("="*60)
    print(f"\nOutput GLB: {CONFIG['output_file']}")
    print(f"Textures saved to: {CONFIG['texture_dir']}")
    print("\nYou can now use the baked GLB in your project.")

# Run the script
if __name__ == "__main__":
    main()
