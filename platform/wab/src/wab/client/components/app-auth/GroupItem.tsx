// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import { Menu, Tooltip } from "antd";
import * as React from "react";
import { MaybeWrap } from "../../../commons/components/ReactUtil";
import {
  DefaultGroupItemProps,
  PlasmicGroupItem,
} from "../../plasmic/plasmic_kit_end_user_management/PlasmicGroupItem";
import InlineEditableResource from "./InlineEditableResource";

// Your component props start with props for variants and slots you defined
// in Plasmic, but you can add more here, like event handlers that you can
// attach to named nodes in your component.
//
// If you don't want to expose certain variants or slots as a prop, you can use
// Omit to hide them:
//
// interface GroupItemProps extends Omit<DefaultGroupItemProps, "hideProps1"|"hideProp2"> {
//   // etc.
// }
//
// You can also stop extending from DefaultGroupItemProps altogether and have
// total control over the props for your component.
export interface GroupItemProps extends DefaultGroupItemProps {
  onRemove: () => Promise<void>;
  onRename: (name: string) => Promise<void>;
  groupName: string;
  isFake?: boolean;
}

function GroupItem_(props: GroupItemProps, ref: HTMLElementRefOf<"div">) {
  const { onRemove, onRename, groupName, isFake, ...rest } = props;
  return (
    <PlasmicGroupItem
      root={{ ref }}
      group={
        <InlineEditableResource
          isFake={isFake}
          visibleValue={
            <span style={{ fontSize: 12, fontWeight: 400 }}>{groupName}</span>
          }
          value={groupName}
          onChange={async (name) => {
            await onRename(name);
          }}
        />
      }
      listItem={{
        menu: (
          <Menu>
            <Menu.Item
              disabled={isFake}
              onClick={async () => {
                await onRemove();
              }}
            >
              <MaybeWrap
                cond={!!isFake}
                wrapper={(children) => {
                  return (
                    <Tooltip title="This operation can't be executed right now. Try again in a few seconds.">
                      {children}
                    </Tooltip>
                  );
                }}
              >
                Remove
              </MaybeWrap>
            </Menu.Item>
          </Menu>
        ),
      }}
      {...rest}
    />
  );
}

const GroupItem = React.forwardRef(GroupItem_);
export default GroupItem;
