// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import * as React from "react";
import { cx, spawn } from "../../../common";
import {
  ApiDirectoryEndUserGroup,
  ApiEndUser,
} from "../../../shared/ApiSchema";
import {
  DefaultDirectoryUserRowProps,
  PlasmicDirectoryUserRow,
} from "../../plasmic/plasmic_kit_end_user_management/PlasmicDirectoryUserRow";
import { XMultiSelect } from "../XMultiSelect";
import styles from "./DirectoryUserRow.module.sass";

// Your component props start with props for variants and slots you defined
// in Plasmic, but you can add more here, like event handlers that you can
// attach to named nodes in your component.
//
// If you don't want to expose certain variants or slots as a prop, you can use
// Omit to hide them:
//
// interface DirectoryUserRowProps extends Omit<DefaultDirectoryUserRowProps, "hideProps1"|"hideProp2"> {
//   // etc.
// }
//
// You can also stop extending from DefaultDirectoryUserRowProps altogether and have
// total control over the props for your component.
export interface DirectoryUserRowProps extends DefaultDirectoryUserRowProps {
  user: ApiEndUser;
  groups: ApiDirectoryEndUserGroup[];
  changeUserGroups: (user: ApiEndUser, newGroupsIds: string[]) => Promise<void>;
  onDelete: () => Promise<void>;
}

function DirectoryUserRow_(
  props: DirectoryUserRowProps,
  ref: HTMLElementRefOf<"div">
) {
  const { user, groups, changeUserGroups, onDelete, ...rest } = props;

  return (
    <PlasmicDirectoryUserRow
      root={{ ref }}
      userEmail={user.email}
      deleteBtn={{
        onClick: onDelete,
      }}
      groupsSelect={{
        render: () => {
          return (
            <XMultiSelect
              className={cx("fill-width", styles.MultiSelectContainer)}
              options={groups
                .filter(
                  (g) => !user.groups.some((ug) => ug.id === g.id) && !g.isFake
                )
                .map((g) => ({
                  label: g.name,
                  value: g.id,
                }))}
              itemKey={(item) => (item ? item.value : "")}
              selectedItems={user.groups.map((g) => ({
                label: g.name,
                value: g.id,
              }))}
              onSelect={(item) => {
                spawn(
                  changeUserGroups(user, [
                    ...user.groups.map((ug) => ug.id),
                    item.value,
                  ])
                );
              }}
              onUnselect={(item) => {
                spawn(
                  changeUserGroups(
                    user,
                    user.groups
                      .filter((ug) => ug.id !== item.value)
                      .map((ug) => ug.id)
                  )
                );
              }}
              filterOptions={(options, filter) => {
                if (!filter) {
                  return options;
                }
                return options.filter((o) =>
                  o.label.toLowerCase().includes(filter.toLowerCase())
                );
              }}
              renderInput={(_options) => (
                <input
                  {..._options}
                  style={{
                    fontSize: 12,
                  }}
                  className="transparent"
                />
              )}
              renderOption={(option) => option.label}
              renderSelectedItem={(option) => option.label}
              pillClassName={styles.MultiSelectPill}
              placeholder="Select"
            ></XMultiSelect>
          );
        },
      }}
      {...rest}
    />
  );
}

const DirectoryUserRow = React.forwardRef(DirectoryUserRow_);
export default DirectoryUserRow;
