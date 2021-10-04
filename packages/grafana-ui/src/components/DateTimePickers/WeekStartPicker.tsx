import React, { useCallback } from 'react';
import { isString } from 'lodash';
import { SelectableValue, WeekStart } from '@grafana/data';
import { Select } from '../Select/Select';

export interface Props {
  onChange: (weekStart?: WeekStart) => void;
  value?: WeekStart;
  width?: number;
  autoFocus?: boolean;
  onBlur?: () => void;
  includeInternal?: boolean;
  disabled?: boolean;
}

const weekStarts: SelectableValue[] = [
  { value: '', label: 'Default' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
  { value: 'monday', label: 'Monday' },
];

export const WeekStartPicker: React.FC<Props> = (props) => {
  const { onChange, width, autoFocus = false, onBlur, value, disabled = false } = props;

  const onChangeWeekStart = useCallback(
    (selectable: SelectableValue<WeekStart>) => {
      if (!selectable || !isString(selectable.value)) {
        return onChange(value);
      }
      onChange(selectable.value);
    },
    [onChange, value]
  );

  return (
    <Select
      value={weekStarts.find((item) => item.value === value)?.value}
      placeholder="Choose starting day of the week"
      autoFocus={autoFocus}
      openMenuOnFocus={true}
      width={width}
      options={weekStarts}
      onChange={onChangeWeekStart}
      onBlur={onBlur}
      disabled={disabled}
      aria-label={'Week start picker'}
    />
  );
};
