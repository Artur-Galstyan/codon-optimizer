# A Codon Optimizer

This is a little app that serves as a frontend for codon optimization. The actual process is deployed on my private server, but the code for it is super simple and straightforward. This is the entire route:

```python
import random
from typing import Literal

import python_codon_tables as pct
from Bio.Data import CodonTable
from fastapi import APIRouter
from pydantic import BaseModel, Field, model_validator
from typing_extensions import Self

router = APIRouter(prefix="/codon-optimizer")


class OptimizeCodonRequest(BaseModel):
    sequence: str
    input_type: Literal["protein", "dna"] = Field("protein", alias="inputType")
    optimization_strategy: Literal["weighted", "highest"] = Field(
        alias="optimizationStrategy"
    )
    organism: str

    @model_validator(mode="after")
    def _validate_sequence(self) -> Self:
        sequence = self.sequence.upper()
        if len(sequence) % 3 != 0:
            raise ValueError("len(sequence) % 3 != 0")

        if self.input_type == "dna":
            valid = set("ATGC")
            if not all(c in "ATGC" for c in sequence):
                invalid_chars = set(sequence) - valid
                raise ValueError(
                    f"DNA sequence contains invalid bases: {invalid_chars}"
                )
        else:
            valid_amino_acids = set("ACDEFGHIKLMNPQRSTVWY")
            if not all(c in valid_amino_acids for c in sequence):
                invalid_amino_acids = set(sequence) - valid_amino_acids
                raise ValueError(
                    f"Protein sequence contains invalid amino acids: {invalid_amino_acids}"
                )
        self.sequence = sequence
        return self


@router.post("/optimize")
def optimize(request: OptimizeCodonRequest):
    try:
        standard_table = CodonTable.standard_dna_table
        sequence = request.sequence.upper()

        optimized_string = ""
        protein_sequence = ""

        if request.input_type == "dna":
            stop_codons = {"TAA", "TAG", "TGA"}
            codons = [sequence[i : i + 3] for i in range(0, len(sequence), 3)]
            protein_sequence = ""

            for c in codons:
                if c in stop_codons:
                    break
                protein_sequence += standard_table.forward_table[c]

        else:
            protein_sequence = sequence

        table: dict[str, dict[str, float]] = pct.get_codons_table(request.organism)
        for aa in protein_sequence:
            codons = table[aa]
            if request.optimization_strategy == "weighted":
                selected_codon = random.choices(
                    list(codons.keys()), list(codons.values())
                )
                optimized_string += selected_codon[0]
            else:
                optimized_string += max(codons, key=codons.get)

        return {"optimized": optimized_string, "error": None}
    except Exception as e:
        print(e)
        return {"error": str(e)}
```

You'll need to add this route to your FastAPI app and point the URLs to it. In my case, I secured it using HS256, so the .env you will need is something like this

```
SERVER_URL="http://localhost:8000"
JWT_SECRET="whateveryoursecretisifyouevenehaveone"
```
