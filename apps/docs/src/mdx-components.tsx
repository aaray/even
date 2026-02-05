import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-docs";
import { DiagramViewer } from "./components/DiagramViewer";
import { ADRStatusBadge } from "./components/ADRStatusBadge";
import { ADRCard } from "./components/ADRCard";
import { StepList, Step } from "./components/StepList";
import { AnnotatedImage } from "./components/AnnotatedImage";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { DeprecationBanner } from "./components/DeprecationBanner";

const docsComponents = getDocsMDXComponents();

export function useMDXComponents(components?: Record<string, React.ComponentType>) {
	return {
		...docsComponents,
		...components,
		// Custom components available in MDX
		DiagramViewer,
		ADRStatusBadge,
		ADRCard,
		StepList,
		Step,
		AnnotatedImage,
		Breadcrumbs,
		DeprecationBanner,
	};
}
