export class PermissionMeta {
  static readonly READ = new PermissionMeta('READ', 'Read permission', true);
  static readonly WRITE = new PermissionMeta('WRITE', 'write permission', false);

  constructor(public name: string, public description: string, public enable: boolean) {}

  static getPermissionByName(name: string): PermissionMeta | undefined {
    if (PermissionMeta.hasOwnProperty(name) && PermissionMeta[name] instanceof PermissionMeta) {
      return PermissionMeta[name];
    }
  }

  static getPermissionMetas(): PermissionMeta[] {
    const permissionList: PermissionMeta[] = [];
    for (const key in PermissionMeta) {
      if (PermissionMeta.hasOwnProperty(key) && PermissionMeta[key] instanceof PermissionMeta) {
        permissionList.push(PermissionMeta[key]);
      }
    }
    return permissionList;
  }
}
