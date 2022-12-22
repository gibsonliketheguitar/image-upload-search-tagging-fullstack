import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactTags } from "react-tag-autocomplete";
//import { suggestions } from "./country-list";

export default function InputTags(props: any) {
  const { state, setState } = props;
  const tagRef = useRef<any>(null);

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
    <ReactTags
      ref={tagRef}
      allowNew={true}
      labelText="Select or add new tags"
      selected={state}
      suggestions={[]}
      onAdd={onAdd}
      onDelete={onDelete}
      renderTag={CustomTag}
      renderOption={CustomOption}
    />
  );
}

function CustomTag({ classNames, tag, ...tagProps }: any) {
  return (
    <button type="button" className={classNames.tag} {...tagProps}>
      <span className={`${classNames.tagName} bg-secondary text-white w-6 h-4`}>
        {tag.label}
      </span>
    </button>
  );
}

//https://github.com/i-like-robots/react-tag-autocomplete/blob/main/example/src/styles.css
function CustomOption({ children, classNames, option, ...optionProps }: any) {
  const classes = [
    classNames.option,
    option.active ? "is-active" : "",
    option.state ? "is-selected" : "",
    "flex space-x-2",
    "bg-red-500",
  ];

  return (
    <div className={classes.join(" ")} {...optionProps}>
      {children}
    </div>
  );
}
