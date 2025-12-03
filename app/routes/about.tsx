export default function About() {
  return (
    <div className="prose text-justify max-w-none">
      <p>This is me using React seriously in a long while.</p>
      <p>
        After years of Svelte - and the occasional Qwik and Astro - I finally
        enter the world of React once more.
      </p>
      <h2>So what exactly is the stack for this app?</h2>
      <p>
        Well, in the world of Svelte, you just have SvelteKit and that's it, but
        in the React world, you can seriously run into choice paralysis as soon
        as you want <b>more</b> than just a SPA. You can choose between NextJS
        and React Router V7 (which used to be called Remix - an awesome name,
        shame that they changed it). While their end goal is similar - both
        allowing SSR, the code is pretty different. For this app I chose React
        Router V7, because it seemed more "open" than NextJS, which comes from
        the makers of Vercel (which is an awesome product, don't get me wrong
        here), but because of that I feel like their motivation is a bit skewed
        here (they want you to use their service, thus making NextJS with
        specifically Vercel in mind - a "conflict" of interest). Ironically,
        this app is still deployed on Vercel.
      </p>
      <p>
        The backend is a standard FastAPI app; it's my personal server, to which
        I just keep adding more and more endpoints. Some of them automate my
        taxes with N8N, others do codon optimisation, because why not.
      </p>
      <p>
        The UI elements come from DaisyUI and CSS is styled using TailwindCSS.
        You thought the Vim vs. Emacs wars were bad? The realms of CSS are very
        divided, their fronts barely moving, ever at war over different ways to
        colour a button. I'm the neutral Switzerland in this case, but
        TailwindCSS is my preferred indifference.
      </p>
      <p className="text-xs">
        (In the editor wars, I'm in the faction of Vim motions - an outskirt
        region, which is editor agnostic so long as they have Vim motions. We're
        sympathetic to the Emacs and Helix tribes, because we all ultimately
        follow the same goal: being fast in our editor.)
      </p>
    </div>
  );
}
