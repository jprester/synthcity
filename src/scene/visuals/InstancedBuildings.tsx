import { useEffect, useRef } from "react";
import { Group } from "three";
import {
  useBuildingInstances,
  type BuildingDescriptor,
} from "./useBuildingInstances";

type InstancedBuildingsProps = {
  buildings: BuildingDescriptor[];
  game: any;
};

export function InstancedBuildings({
  buildings,
  game,
}: InstancedBuildingsProps) {
  const groupRef = useRef<Group>(null);
  const meshesAddedRef = useRef(false);
  const { updateInstances, getInstancedMeshes, isReady } =
    useBuildingInstances(game?.assets ?? null);

  // Add InstancedMesh objects to scene once
  useEffect(() => {
    if (!isReady || !groupRef.current || meshesAddedRef.current) {
      return;
    }

    const meshes = getInstancedMeshes();
    for (const mesh of meshes) {
      groupRef.current.add(mesh);
    }
    meshesAddedRef.current = true;

    return () => {
      if (groupRef.current) {
        for (const mesh of meshes) {
          groupRef.current.remove(mesh);
        }
      }
      meshesAddedRef.current = false;
    };
  }, [isReady, getInstancedMeshes]);

  // Update instances when buildings change
  useEffect(() => {
    if (!isReady) {
      return;
    }
    updateInstances(buildings);
  }, [buildings, isReady, updateInstances]);

  return <group ref={groupRef} />;
}

export type { BuildingDescriptor };
