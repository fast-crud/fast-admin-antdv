import * as api from "./api";
import { dict, compute } from "@fast-crud/fast-crud";
export default function ({ expose }) {
  const { crudBinding } = expose;
  const pageRequest = async (query) => {
    return await api.GetList(query);
  };
  const editRequest = async ({ form, row }) => {
    form.id = row.id;
    return await api.UpdateObj(form);
  };
  const delRequest = async ({ row }) => {
    return await api.DelObj(row.id);
  };

  const addRequest = async ({ form }) => {
    return await api.AddObj(form);
  };

  return {
    crudOptions: {
      request: {
        pageRequest,
        addRequest,
        editRequest,
        delRequest
      },
      actionbar: {
        buttons: {
          add: {
            show: compute(() => {
              if (crudBinding.value) {
                return !crudBinding.value?.table.editable.enabled;
              }
              return false;
            })
          },
          addRow: {
            show: compute(() => {
              if (crudBinding.value) {
                return crudBinding.value?.table.editable.enabled;
              }
              return false;
            })
          }
        }
      },
      table: {
        editable: {
          mode: "free"
        }
      },
      columns: {
        id: {
          title: "ID",
          type: "number",
          form: {
            show: false
          },
          column: { width: 80, align: "center" }
        },
        disable: {
          title: "禁止编辑",
          type: "text",
          column: {
            editable: {
              disabled: true
            }
          }
        },
        radio: {
          title: "状态",
          search: { show: true },
          type: "dict-radio",
          dict: dict({
            url: "/mock/dicts/OpenStatusEnum?single"
          })
        },
        name: {
          title: "姓名",
          type: "text"
        },
        province: {
          title: "省份",
          search: { show: true },
          type: "dict-select",
          dict: dict({
            value: "id",
            label: "text",
            data: [
              { id: "sz", text: "深圳", color: "success" },
              { id: "gz", text: "广州", color: "primary" },
              { id: "bj", text: "北京" },
              { id: "wh", text: "武汉" },
              { id: "sh", text: "上海" }
            ]
          })
        }
      }
    }
  };
}
