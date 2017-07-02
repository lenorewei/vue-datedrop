/**
 * Created by weirong on 2017/3/24.
 */
const DOC = document;
export function onThis (name, cb) {
  if (!DOC.addEventListener && DOC.attachEvent) {
    DOC.attachEvent('on' + name, cb);
  } else {
    DOC.addEventListener(name, cb);
  }
}

export function offThis (name, cb) {
  if (!DOC.removeEventListener && DOC.detachEvent) {
    DOC.detachEvent('on' + name, cb);
  } else {
    DOC.removeEventListener(name, cb);
  }
}

export function isOutside (ele, e) {
  let eTarget = (e.target) ? e.target : e.srcElement;
  if (eTarget.parentElement == null && eTarget != DOC.body.parentElement) {
    return false;
  }
  while (eTarget != null) {
    if (ele.indexOf(eTarget) != -1) return false;
    eTarget = eTarget.parentElement;
  }
  return true;
}
