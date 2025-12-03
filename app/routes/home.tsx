import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Codon Optimizer" }];
}

export default function Home() {
  return (
    <main className="w-full">
      <article className="prose max-w-none text-justify">
        <p>
          This is a small demo codon optimiser that I built out of curiosity.
          It's also a good opportunity to brush up on the ol' React, more on
          that{" "}
          <a className="link" href="/about">
            here.
          </a>{" "}
          Expect rough edges as I made this over the weekend. If you try to
          break this page, you probably will. You can find the code for the
          optimizer{" "}
          <a className="link" href="/code">
            here.
          </a>
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              window.location.href = "/codon";
            }}
            className="btn"
          >
            Get Started With Codon Optimizer
          </button>
        </div>
        <p>
          Little disclaimer: This tool is by no means perfect and has some
          limitations. E.g., it doesn't really validate your input sequence in
          the sense that it doesn't check if your input "makes sense" (is this
          even a "valid" protein, does it start and end correctly etc.). It also
          doesn't check for physical limitations: does this bacterium even have
          enough tRNAs to build the protein (it should run out at some point,
          right?). For now, it just assumes that the frequency distribution of
          tRNAs remains fixed, which is probably incorrect.
        </p>
        <p>
          Here's my understanding of what a codon optimiser is, based on a
          recent chat with my dear friend Mr. Claude:
        </p>
        <p>
          A codon is a group of 3 bases in RNA (and DNA too I guess?). Each of
          them code for a specific amino acid, which are the building blocks for
          proteins.
        </p>
        <p>
          There are 64 codons, but only 20 amino acids, which means multiple
          codons can code for the same amino acid, e.g. these are all "synonyms"
          for Leucine: CUU, CUC, CUA, CUG, UUA, UUG.
        </p>
        <p>
          The cell uses tRNAs (small molecules) to physically carry amino acids
          to the protein-building machinery (an enzyme I think). Each tRNA
          recognises a specific codon. BUT: organisms don't have equal amounts
          of each tRNA type. If your gene uses "CUA" a lot, the Ribosome has to
          wait for rare tRNAs to become available. Ain't nobody got time for
          that. You gotta make due with what you have.
        </p>
        <p>
          For a codon optimiser, you can have as input either a suboptimal DNA
          string that needs to be optimised. But wth is a suboptimal DNA? Well,
          let's say you - dear reader - are an E. Coli bacterium and I'm a mad
          scientist. I will give you a bit of human DNA and you have to make me
          some insulin. Human codon preferences are different from your codon
          preferences. You prefer to have CUG codons for Leucine, while the
          human gene prefers CUA. Now, you're in a pickle.
        </p>
        <p>
          You are given a foreign bit of DNA that tells you to use CUA, but you
          can't. You just ran out of CUA tRNAs. You can now either wait (the
          protein production stalls, perhaps falls off and you get a useless
          protein) or you make an error (equally useless protein). The solution?
          Before giving you the DNA, I (using the power of black voodoo magic as
          far as my understanding goes) rewrite it. I swap out all the CUA
          codons for CUG codons because I know that those are your favourites.
          Same amino acid, different spelling. Now when you read it, you breeze
          through — plenty of CUG tRNAs available. And THAT is the optimisation
          part: I optimise the given DNA strand to fit YOUR tRNA frequency
          distribution.
        </p>
        <span className="text-xs">
          Apparently, we humans can just "change" DNA, and no ones' head
          explodes at the thought. It's like we found private functions in
          Nature's API that were not meant to be publically used but here we
          are, very much using them and writing our own docs to top it off.
        </span>
      </article>
    </main>
  );
}
