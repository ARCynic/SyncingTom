import {
  createLadderStep,
  moveLadderStep,
} from "@/lib/subdivision/ladder.js";

import {
  LadderStep,
} from "./LadderStep.jsx";

export function LadderEditor({
  steps,
  denominator,
  onChange,
}) {
  function updateStep(
    index,
    nextStep,
  ) {
    onChange(
      steps.map(
        (step, stepIndex) =>
          stepIndex === index
            ? nextStep
            : step,
      ),
    );
  }

  function deleteStep(index) {
    if (
      steps.length <= 1
    ) {
      return;
    }

    onChange(
      steps.filter(
        (_, stepIndex) =>
          stepIndex !== index,
      ),
    );
  }

  function addStep() {
    const last =
      steps[
        steps.length - 1
      ];

    const nextSubdivision =
      Math.min(
        16,
        (last?.subdivision ??
          0) + 1,
      );

    onChange([
      ...steps,

      createLadderStep(
        nextSubdivision,
        1,
      ),
    ]);
  }

  return (
    <div>
      <div
        className="
          grid
          gap-3
          lg:grid-cols-2
          2xl:grid-cols-3
        "
      >
        {steps.map(
          (step, index) => (
            <LadderStep
              key={step.id}
              step={step}
              index={index}
              total={
                steps.length
              }
              denominator={
                denominator
              }
              onChange={(
                nextStep,
              ) =>
                updateStep(
                  index,
                  nextStep,
                )
              }
              onDelete={() =>
                deleteStep(
                  index,
                )
              }
              onMoveLeft={() =>
                onChange(
                  moveLadderStep(
                    steps,
                    index,
                    index - 1,
                  ),
                )
              }
              onMoveRight={() =>
                onChange(
                  moveLadderStep(
                    steps,
                    index,
                    index + 1,
                  ),
                )
              }
            />
          ),
        )}
      </div>

      <button
        type="button"
        onClick={addStep}
        className="
          mt-4
          min-h-12
          w-full
          rounded-2xl
          border
          border-dashed
          border-purple-300/25
          bg-purple-300/[0.035]
          text-sm
          font-bold
          text-purple-200/70
          transition
          hover:border-purple-300/45
          hover:bg-purple-300/[0.07]
          hover:text-purple-100
        "
      >
        + Add subdivision
      </button>
    </div>
  );
}