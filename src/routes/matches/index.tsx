import { component$, useTask$ } from "@builder.io/qwik";
import { RequestHandler, useNavigate } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ redirect }) => {
    throw redirect(301, "https://ftcscout.org/teams/15534");
};

export default component$(() => {
    const navigate = useNavigate();

    useTask$(async () => {
        await navigate("https://ftcscout.org/teams/15534");
    })

    return <div></div>;
})