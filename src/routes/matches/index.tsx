import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ redirect }) => {
    throw redirect(301, "https://ftcscout.org/teams/15534");
};

export default component$(() => {
    return <div></div>;
})