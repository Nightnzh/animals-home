import { FavoriteIcon, HospitalIcon, LetterIcon, PairIcon, TypeIcon } from "../component/Icons";
import { Pair } from "../page/Pair";
import { TestN } from "../testcomponent/TestComponent";



export const routes = [
  {
    path: "/",
    icon: PairIcon,
    iconObj: PairIcon,
    tit: "配對",
    component: <Pair/>
  },
  {
    path: "/favorite",
    icon: FavoriteIcon,
    iconObj: FavoriteIcon,
    tit: "收藏",
    component: <></>
  },
  {
    path: "/type",
    icon: TypeIcon,
    iconObj: TypeIcon,
    tit: "主題",
    component: <></>
  },
  {
    path: "/letter",
    icon: LetterIcon,
    iconObj: LetterIcon,
    tit: "送養",
    component: <></>
  },
  {
    path: "/animal-hospital",
    icon: HospitalIcon,
    iconObj: HospitalIcon,
    tit: "急診",
    component: <></>
  },
]

