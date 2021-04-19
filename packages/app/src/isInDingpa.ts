import { getStore } from "@dingpa/shared"

const isInDingpa = () => {
  return !!getStore('container');
}

export default isInDingpa;