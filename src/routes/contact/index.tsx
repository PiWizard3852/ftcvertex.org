import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ redirect }) => {
    throw redirect(301, "mailto:vertex15534@gmail.com");
};

export default component$(() => {
    return <div></div>;
})