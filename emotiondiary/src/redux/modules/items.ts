// 액션 타입 정의
export const INIT_ITEM = 'emotiondiary/items/INIT_ITEM' as const;
export const CREATE_ITEM = 'emotiondiary/items/CREATE_ITEM' as const;
export const REMOVE_ITEM = 'emotiondiary/items/REMOVE_ITEM' as const;
export const EDIT_ITEM = 'emotiondiary/items/EDIT_ITEM' as const;

// 액션 생성 함수
export const initItem = (data: Array<DiaryItemType>) => ({
  type: INIT_ITEM,
  data,
})

export const createItem = (
  dataId: string,
  date: string,
  content: string,
  emotion: number,
  images: string
) => ({
  type: CREATE_ITEM,
  data: {
    id: dataId,
    date: new Date(date).getTime(),
    content,
    emotion,
    images,
  },
});

export const removeItem = (targetID: string) => ({
  type: REMOVE_ITEM,
  targetID,
});

export const editItem = (
  dataId: string,
  date: string,
  content: string,
  emotion: number,
  images: any
) => ({
  type: EDIT_ITEM,
  data: {
    id: dataId,
    date: new Date(date).getTime(),
    content,
    emotion,
    images,
  },
});

type DiaryItemActionType =
  | ReturnType<typeof initItem>
  | ReturnType<typeof createItem>
  | ReturnType<typeof removeItem>
  | ReturnType<typeof editItem>

export type DiaryItemType = {
  id: string;
  date: string | number;
  content: string;
  emotion: number;
  images: string;
};

export type DiaryItemStateType = Array<DiaryItemType>;


// 초기값
const InitialState: DiaryItemStateType = [];

export default function reducer(
  previousState: DiaryItemStateType = InitialState,
  action: DiaryItemActionType
) {
  let newState: DiaryItemStateType = [];
  switch (action.type) {
    case INIT_ITEM: {
      return action.data;
    }
    case CREATE_ITEM: {
      newState = [action.data, ...previousState];
      break;
    }
    case REMOVE_ITEM: {
      newState = previousState.filter((it) => it.id !== action.targetID);
      break;
    }
    case EDIT_ITEM: {
      newState = previousState.map((it) => 
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return previousState;
  }
  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
}

