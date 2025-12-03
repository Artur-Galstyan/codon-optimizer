import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import type { Route } from "./+types/codon";
import * as jose from "jose";
import { data } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const requestJson = await request.json();
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT()
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  const req = await fetch(
    process.env.SERVER_URL + "/codon-optimizer/optimize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestJson),
    },
  );
  if (req.status !== 200) {
    let errorText = JSON.parse(await req.text());

    return data({
      error: "An error has occured :(",
      details: errorText,
    });
  }
  const res = await req.json();
  return data(res);
}

const AMINO_ACIDS = [
  "A",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "V",
  "W",
  "Y",
];

const CODONS = [
  "AAA",
  "AAC",
  "AAG",
  "AAT",
  "ACA",
  "ACC",
  "ACG",
  "ACT",
  "AGA",
  "AGC",
  "AGG",
  "AGT",
  "ATA",
  "ATC",
  "ATG",
  "ATT",
  "CAA",
  "CAC",
  "CAG",
  "CAT",
  "CCA",
  "CCC",
  "CCG",
  "CCT",
  "CGA",
  "CGC",
  "CGG",
  "CGT",
  "CTA",
  "CTC",
  "CTG",
  "CTT",
  "GAA",
  "GAC",
  "GAG",
  "GAT",
  "GCA",
  "GCC",
  "GCG",
  "GCT",
  "GGA",
  "GGC",
  "GGG",
  "GGT",
  "GTA",
  "GTC",
  "GTG",
  "GTT",
  "TAA",
  "TAC",
  "TAG",
  "TAT",
  "TCA",
  "TCC",
  "TCG",
  "TCT",
  "TGA",
  "TGC",
  "TGG",
  "TGT",
  "TTA",
  "TTC",
  "TTG",
  "TTT",
];

export default function Codon() {
  const fetcher = useFetcher();
  const [sequence, setSequence] = useState("");
  const [organism, setOrganism] = useState("e_coli");
  const [inputType, setInputType] = useState<"protein" | "dna">("protein");
  const [optimizationStrategy, setOptimizationStrategy] = useState<
    "weighted" | "highest"
  >("weighted");

  const handleSubmit = () => {
    fetcher.submit(
      { sequence, inputType, optimizationStrategy, organism },
      { method: "POST", encType: "application/json" },
    );
  };

  useEffect(() => {
    if (fetcher.data) {
      console.log("result", fetcher.data);
    }
  }, [fetcher.data]);

  function generateRandomSequence() {
    const maxLength = 100;
    let length = Math.floor(Math.random() * maxLength);
    while (length % 3 !== 0) {
      length++;
    }

    let seqArray = inputType === "protein" ? AMINO_ACIDS : CODONS;

    setSequence(
      Array.from(
        { length },
        () => seqArray[Math.floor(Math.random() * seqArray.length)],
      ).join(""),
    );
  }

  return (
    <>
      <div className="flex space-x-4">
        <textarea
          value={sequence}
          onChange={(e) => {
            setSequence(e.target.value);
          }}
          className="textarea w-full my-4"
          placeholder="Insert DNA or protein sequence"
        ></textarea>
        <div className="flex flex-col justify-center">
          <button
            onClick={generateRandomSequence}
            className="btn btn-secondary"
          >
            Generate Random {inputType.toUpperCase()} Sequence
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex space-x-2">
          <div>Protein</div>
          <input
            type="radio"
            name="protein-or-dna"
            className="radio"
            onChange={() => {
              setInputType("protein");
            }}
            checked={inputType === "protein"}
          />
        </div>

        <div className="flex space-x-2">
          <div>DNA</div>

          <input
            type="radio"
            name="protein-or-dna"
            className="radio"
            onChange={() => {
              setInputType("dna");
            }}
            checked={inputType === "dna"}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="my-auto">Optimization strategy</div>

        <select
          value={optimizationStrategy}
          onChange={(e) => {
            setOptimizationStrategy(e.target.value as "weighted" | "highest");
          }}
          className="select"
        >
          <option value={"placeholder"} disabled>
            Pick a strategy
          </option>
          <option value={"weighted"}>Weighted Average</option>
          <option value={"highest"}>Highest Frequency</option>
        </select>
      </div>

      <div className="flex justify-between">
        <div className="my-auto">Organism</div>

        <select
          value={organism}
          onChange={(e) => {
            setOrganism(e.target.value);
          }}
          className="select"
        >
          <option value="placeholder" disabled>
            Pick an Organism
          </option>
          <option value={"b_subtilis"}>B. subtilis</option>
          <option value={"c_elegans"}>C. elegans</option>
          <option value={"d_melanogaster"}>D. melanogaster</option>
          <option value={"e_coli"}>E. coli</option>
          <option value={"g_gallus"}>G. gallus</option>
          <option value={"h_sapiens"}>H. sapiens (human)</option>
          <option value={"m_musculus"}>M. musculus (mouse)</option>
          <option value={"s_cerevisiae"}>S. cerevisiae (yeast)</option>
        </select>
      </div>

      <div className="flex justify-center my-8">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={fetcher.state === "submitting"}
        >
          {fetcher.state === "submitting" ? "Optimizing..." : "Optimize!"}
        </button>
      </div>

      {fetcher.data && (
        <div className="p-4 bg-gray-100 mt-4 rounded overflow-x-scroll">
          <pre>{JSON.stringify(fetcher.data, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
