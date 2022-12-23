import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
//import { suggestions } from "./country-list";

export default function InputTags(props: any) {
  const { className, state, setState } = props;

  const onAdd = useCallback(
    (newTag: any) => {
      setState([...state, newTag]);
    },
    [state]
  );

  const onDelete = useCallback(
    (tagIndex: any) => {
      setState(state.filter((_: any, i: number) => i !== tagIndex));
    },
    [state]
  );

  return (
    <span className={className}>
      <ReactTags
        allowNew={true}
        labelText="Select or add new tags"
        selected={state}
        suggestions={[]}
        onAdd={onAdd}
        onDelete={onDelete}
      />
    </span>
  );
}