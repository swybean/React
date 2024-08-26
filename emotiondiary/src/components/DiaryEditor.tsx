import { useNavigate } from "react-router-dom";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import { BiTrash, BiArrowBack, BiCheck, BiImageAdd, BiX } from "react-icons/bi";

import { useDispatch } from "react-redux";
import {
  createItem,
  DiaryItemType,
  editItem,
  removeItem,
} from "../redux/modules/items";
import shortId from "shortid";
