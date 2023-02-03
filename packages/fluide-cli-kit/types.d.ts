interface BasePrompt {
  name: string;
}

interface TextPrompt extends BasePrompt {
  type: "text";
}

interface ConfirmPrompt extends BasePrompt {
  type: "confirm";
}

interface SelectPrompt<Choices extends Readonly<Array<Readonly<Choice>>>>
  extends BasePrompt {
  type: "select";
  choices: Choices;
}

interface MultiselectPrompt<Choices extends Readonly<Array<Readonly<Choice>>>>
  extends BasePrompt {
  type: "multiselect";
  choices: Choices;
}

interface Choice {
  value: any;
  label: string;
  hint?: string;
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type Prompt =
  | TextPrompt
  | ConfirmPrompt
  | SelectPrompt<Readonly<Choice[]>>
  | MultiselectPrompt<Readonly<Choice[]>>;

type Answer<
  T extends Prompt,
  Choices extends Readonly<Choice[]> = T extends SelectPrompt<infer C>
    ? C
    : T extends MultiselectPrompt<infer C>
    ? C
    : never
> = T extends TextPrompt
  ? string
  : T extends ConfirmPrompt
  ? boolean
  : T extends SelectPrompt<Choices>
  ? Choices[number]["value"]
  : T extends MultiselectPrompt<Choices>
  ? Array<Choices[number]["value"] | undefined>
  : never;

type Answers<T extends Readonly<Prompt> | Readonly<Prompt[]>> =
  T extends Readonly<Prompt>
    ? Partial<{ [key in T["name"]]: Answer<T> }>
    : T extends Readonly<Prompt[]>
    ? UnionToIntersection<Answers<T[number]>>
    : never;

interface PromptOptions {
  onSubmit?: () => any;
  onCancel?: () => any;
}

export default function prompt<T extends Readonly<Prompt> | Readonly<Prompt[]>>(
  questions: T,
  opts?: PromptOptions
): Promise<Answers<T>>;
