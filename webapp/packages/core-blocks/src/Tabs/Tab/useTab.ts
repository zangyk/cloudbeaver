/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2021 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { useContext, useEffect } from 'react';

import type { IExecutorHandler } from '@cloudbeaver/core-executor';

import { useObjectRef } from '../../useObjectRef';
import type { ITabData } from '../TabsContainer/ITabsContainer';
import { TabsContext } from '../TabsContext';

export function useTab(
  tabId: string,
  onOpen?: (tab: ITabData<any>) => void,
  onClose?: (tab: ITabData<any>) => void
) {
  const state = useContext(TabsContext);
  if (!state) {
    throw new Error('TabsContext not provided');
  }

  const dynamic = useObjectRef({
    tabId,
    open: onOpen,
    close: onClose,
  });

  useEffect(() => {
    const openHandler: IExecutorHandler<ITabData<any>> = data => {
      if (dynamic.tabId !== data.tabId) {
        return;
      }
      dynamic.open?.(data);
    };
    const closeHandler: IExecutorHandler<ITabData<any>> = data => {
      if (dynamic.tabId !== data.tabId) {
        return;
      }
      dynamic.close?.(data);
    };

    state.openExecutor.addHandler(openHandler);
    state.closeExecutor.addHandler(closeHandler);

    return () => {
      state.openExecutor.removeHandler(openHandler);
      state.closeExecutor.removeHandler(closeHandler);
    };
  }, [state.openExecutor, state.closeExecutor]);

  const handleOpen = () => state.open(tabId);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation(); // it's here because close triggers handleOpen too
    state.close(tabId);
  };

  return {
    state,
    selected: state.state.selectedId === tabId,
    handleOpen,
    handleClose,
  };
}
