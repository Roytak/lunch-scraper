import { c as create_ssr_component } from "../../chunks/ssr.js";
import { e as escape } from "../../chunks/escape.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-38tfsr_START -->${$$result.title = `<title>Jíííídlo</title>`, ""}<!-- HEAD_svelte-38tfsr_END -->`, ""} <h1 data-svelte-h="svelte-yyjjjs">Welcome to SvelteKit</h1> <p data-svelte-h="svelte-jl9sbz">Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> <p>Menu: ${escape(data.lunches)}</p>`;
});
export {
  Page as default
};
