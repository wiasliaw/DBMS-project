interface AdminObj {
  user: string;
  pawd: string;
}

class Admin {
  private config:AdminObj;
  public link:string;

  constructor(obj:AdminObj) {
    this.config = obj;
    this.link = '';
  }

  public applyLink():void {
    this.link = 'admindefault';
  }

  public authAdmin(u:string, p:string):Boolean {
    if (u === this.config.user && p === this.config.pawd) {
      return true;
    }
    return false;
  }
}

export default Admin;
