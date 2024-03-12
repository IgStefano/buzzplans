import { PlanData, PlanDataAPI } from "@/components/form/types/plans";

const BASE_URL = "http://localhost:3000/api";

type getAction = {
  action: "get";
};

type fetchAction = {
  action: "fetch";
  id: string;
};

type createAction = {
  action: "create";
  data: PlanData;
};

type updateAction = {
  action: "update";
  data: PlanDataAPI;
};

type deleteAction = {
  action: "delete";
  id: string;
};

type apiProps =
  | getAction
  | fetchAction
  | createAction
  | updateAction
  | deleteAction;

export function api(props: apiProps) {
  switch (props.action) {
    case "get":
      return fetch(`${BASE_URL}/get-plans/`);
    case "fetch":
      return fetch(`${BASE_URL}/fetch-plan/${props.id}`);
    case "create":
      return fetch(`${BASE_URL}/create-new-plan/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props.data),
      });
    case "update":
      return fetch(`${BASE_URL}/update-plan/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props.data),
      });
    case "delete":
      return fetch(`${BASE_URL}/delete-plan/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: props.id }),
      });
  }
}
