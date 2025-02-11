import { component$, useTask$ } from "@builder.io/qwik";
import { RequestHandler, useNavigate } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ redirect }) => {
    throw redirect(301, "mailto:vertex15534@gmail.com");
};

export default component$(() => {
    const navigate = useNavigate();

    useTask$(async () => {
        await navigate("mailto:vertex15534@gmail.com");
    })

    return <div></div>;
})