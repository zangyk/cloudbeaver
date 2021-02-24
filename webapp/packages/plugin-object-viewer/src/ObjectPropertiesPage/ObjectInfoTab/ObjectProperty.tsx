/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2021 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observer } from 'mobx-react-lite';

import { FieldCheckboxNew, InputFieldNew } from '@cloudbeaver/core-blocks';

import type { ObjectPropertyProps } from '../formControls';
import { additionalProps, filterProperty, getValue, matchType } from '../helpers';

export const ObjectProperty = observer(function ObjectProperty({
  objectProperty,
}: ObjectPropertyProps) {
  if (!objectProperty || !filterProperty(objectProperty)) {
    return null;
  }

  return (
    <>
      {matchType(objectProperty.dataType) === 'checkbox'
        ? (
          <FieldCheckboxNew
            name={objectProperty.id}
            value={getValue(objectProperty.value)}
            readOnly
            {...additionalProps(objectProperty)}
          >
            {objectProperty.displayName}
          </FieldCheckboxNew>
        )
        : (
          <InputFieldNew
            name={objectProperty.id}
            value={getValue(objectProperty.value)}
            mod='surface'
            readOnly
            {...additionalProps(objectProperty)}
          >{objectProperty.displayName}
          </InputFieldNew>
        )}
    </>
  );
});
