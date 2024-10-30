import type { IFieldInstance, Record } from '../../../model';
import type { IPosition, IRectangle } from '../../grid/interface';
import type { CombinedSelection } from '../../grid/managers';

export interface IHeaderMenu {
  fields: IFieldInstance[];
  position: IPosition;
  onSelectionClear?: () => void;
}

export interface IRecordMenu {
  // only single select record
  record?: Record;
  neighborRecords?: (Record | null)[];
  isMultipleSelected?: boolean;
  position: IPosition;
  deleteRecords?: (selection: CombinedSelection) => Promise<void>;
  insertRecord?: (anchorId: string, position: 'before' | 'after', num: number) => void;
}

export interface IStatisticMenu {
  fieldId: string;
  position: IRectangle;
}
