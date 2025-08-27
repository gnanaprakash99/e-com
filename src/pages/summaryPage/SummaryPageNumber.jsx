import React from "react";

// Custom hook to detect screen size
export const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const SummaryPageNumber = ({ currentStep }) => {
  const isSmUp = useMediaQuery("(max-width: 640px)");

  const steps = isSmUp
    ? [
      { label: "Product", labelOffset: "ml-4" },
      { label: "Address", labelOffset: "ml-4" },
      { label: "Payment", labelOffset: "" },
      { label: "Summary", labelOffset: "mr-8" },
    ]
    : [
      { label: "Address", labelOffset: "ml-4" },
      { label: "Payment", labelOffset: "" },
      { label: "Summary", labelOffset: "mr-8" },
    ];

  return (
    <div className="flex flex-col mt-5 items-center">
      {/* Row 1: Circles + Lines */}
      <div className="flex items-center">
        {steps.map((step, index) => {
          let status = "upcoming";
          if (step.label === currentStep) status = "current";
          else if (
            steps.findIndex((s) => s.label === step.label) <
            steps.findIndex((s) => s.label === currentStep)
          ) {
            status = "completed";
          }

          return (
            <React.Fragment key={index}>
              {/* Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${status === "completed"
                    ? "bg-secondaryLite text-white"
                    : status === "current"
                      ? "border-2 border-secondaryLite text-secondaryLite bg-white"
                      : "border-2 border-mutedText text-mutedText bg-white"
                  }`}
              >
                {status === "completed" ? "✓" : index + 1}
              </div>

              {/* Line */}
              {index < steps.length - 1 && (
                <div
                  className={`h-[2px] 
      w-10 md:w-20   // 👈 shorter line on mobile, longer on md+
      ${status === "completed"
                      ? "bg-secondaryLite"
                      : status === "current"
                        ? "bg-mutedText"
                        : "bg-gray-300"
                    }
    `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Row 2: Labels */}
      <div className="flex justify-between w-full max-w-[300px] mt-2">
        {steps.map((step, index) => {
          let status = "upcoming";
          if (step.label === currentStep) status = "current";
          else if (
            steps.findIndex((s) => s.label === step.label) <
            steps.findIndex((s) => s.label === currentStep)
          ) {
            status = "completed";
          }

          return (
            <div
              key={index}
              className={`w-8 text-center text-sm ${step.labelOffset}`}
            >
              <span
                className={`${status === "upcoming" ? "text-gray-400" : "text-black"
                  }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SummaryPageNumber;