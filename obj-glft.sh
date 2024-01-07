#!/bin/bash

# Directory containing .obj files
OBJ_DIR="assets/models"

# Directory to save .gltf files
GLTF_DIR="assets/models/gltf"

# Ensure obj2gltf is installed
if ! command -v obj2gltf &> /dev/null
then
    echo "obj2gltf could not be found, please install it first"
    exit
fi

# Loop over all .obj files in the directory
for obj_file in $OBJ_DIR/*.obj
do
  # Get the base name of the file (without path and extension)
  base_name=$(basename "$obj_file" .obj)

  # Convert the .obj file to .gltf
  obj2gltf -i "$obj_file" -o "$GLTF_DIR/$base_name.gltf"
done