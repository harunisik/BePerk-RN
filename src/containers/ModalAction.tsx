export enum ModalActionType {
  SET_MODAL = 'set-modal',
}

export interface ModalInfo {
  isOpen: boolean;
}

interface ModalAction {
  type: ModalActionType;
  isModalOpen?: boolean;
  // modalInfo?: ModalInfo;
}

export default ModalAction;
