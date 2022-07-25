
// import { Conf } from "../core/conf";
import { MyDisplay } from "../core/myDisplay";
// import { Param } from "../core/param";
import { Tween } from "../core/tween";
import { Point } from "../libs/point";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _item:Array<HTMLElement> = [];

  constructor(opt:any) {
    super(opt)

    const num = 60;
    for(let i = 0; i < num; i++) {
      const item = document.createElement('div');
      item.classList.add('item');
      this.getEl().append(item);

      if(Util.instance.hit(6)) {
        item.innerHTML = Util.instance.randomArr('ACDEFGHIKLMNOPRSTUVWXYZ0123456789'.split(''));
        item.classList.add('a');
      } else {
        item.innerHTML = 'B';
        item.classList.add('b');

        Tween.instance.set(item, {
          fontSize: Util.instance.randomInt(18, 150),
        })
      }

      this._item.push(item);
    }
  }




  protected _update(): void {
    super._update();

    const center = new Point(window.innerWidth * 0.5, window.innerHeight * 0.5);
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
    const ang = this._c * 1;
    this._item.forEach((val,i) => {
      const radian = Util.instance.radian(ang + i * 10);
      // const radian = Util.instance.radian(ang + (360 / this._item.length) * i);
      // const x = center.x + Math.sin(radian) * radius;
      const x = (window.innerWidth / this._item.length) * i;
      const y = center.y + Math.cos(radian) * radius;

      // const dx = center.x - x;
      // const dy = center.y - y;
      // const rot = Util.instance.degree(Math.atan2(dy, dx));

      Tween.instance.set(val, {
        x:x,
        y:y - this.getHeight(val) * 0.5,
        // rotationZ:rot
      });
    })

  }
}