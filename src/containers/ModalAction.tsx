import {Fragment, ReactElement} from 'react';

export enum ModalActionType {
  OPEN = 'open-modal',
  CLOSE = 'close-modal',
}

type FragmentType = typeof Fragment;

export interface ModalInfo {
  isOpen?: boolean;
  component?: ReactElement | FragmentType;
}

interface ModalAction {
  type: ModalActionType;
  modalInfo?: ModalInfo;
}

export default ModalAction;
