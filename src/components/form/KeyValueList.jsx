import React, { useState } from "react";
import { Input, } from 'baseui/input';
import { Button, KIND, SIZE } from "baseui/button";
import { Delete, Plus } from "baseui/icon";
import { arrayRemove } from "baseui/dnd-list";

const KeyValueInput = ({ initial_key = "", initial_value = "", onChange = () => { }, onDelete = () => { } }) => {
  const [key, setKey] = useState(initial_key);
  const [value, setValue] = useState(initial_value);

  const onBlur = () => {
    onChange({ key, value });
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        columnGap: "10px",
        paddingBottom: "10px",
      }}
    >
      <Input
        placeholder="Key"
        value={key}
        onChange={e => setKey(e.target.value)}
        onBlur={onBlur}
      />
      <Input
        placeholder="Value"
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
      />
      <Button
        type="button"
        kind={KIND.minimal}
        size={SIZE.mini}
        onClick={onDelete}
      >
        <Delete />
      </Button>
    </div>
  );
};

const KeyValueList = ({ data, setData }) => {
  return (
    <div
      style={{ display: "block", }}
    >
      {
        data.map((val, index) => {
          return <KeyValueInput
            key={val["id"]}
            initial_key={Object.keys(val)[1]}
            initial_value={val[Object.keys(val)[1]]}
            onChange={({ key, value }) => {
              setData(old_params => {
                let new_params = [...old_params];
                // set new key and value and preserve existing id
                new_params[index] = { id: new_params[index]["id"], [key]: value };
                console.log(new_params);
                return new_params;
              });
            }}
            onDelete={() => {
              setData(arrayRemove(data, index));
            }}
          />
        })
      }
      <Button
        type={"button"}
        kind={KIND.secondary}
        onClick={() => {
          setData(old_params => {
            // add new item with a unique id
            let new_params = [...old_params, { id: `${new Date().getTime()}` }];

            return new_params;
          })
        }}
        $style={{ width: "100%" }}
      >
        <Plus /> Add Item
      </Button>
    </div>
  );
};

export const dataToQueryStringList = (data) => {
  return data.reduce((result, item) => {
    let key = Object.keys(item)[1];
    result[key] = item[key];

    return result;
  }, {});
};

export default KeyValueList;
