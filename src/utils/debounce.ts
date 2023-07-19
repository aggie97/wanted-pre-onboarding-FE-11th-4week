// 입력 지연 debounce
// input : 함수, 지연시간
// setTimeout을 이용한 지연
// output: 함수

import { ChangeEvent } from "react";

const debounce = (callbackFn: (args: ChangeEvent<HTMLInputElement>) => void, delay: number) => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callbackFn.apply(this, args);
    }, delay);
  };
};

export default debounce;
