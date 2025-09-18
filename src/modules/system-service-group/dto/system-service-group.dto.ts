export class SystemServiceGroupDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class SystemServiceGroupHierarchyDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  services: {
    id: number;
    name: string;
    systemServiceType: {
      id: number;
      name: string;
    };
  }[];
}
