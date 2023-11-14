export type AccountPropertiesType = {
  // Auto-created properties
  id: string;
  dateAdded: Date;
  lastCopied?: Date;

  // Editable properties
  label: string;
  secret: string;
  username: string;
  issuerName: string;
  issuerUrl?: string;
};

export type EditableAccountPropertiesType = Pick<
  AccountPropertiesType,
  "label" | "secret" | "username" | "issuerName" | "issuerUrl"
>;

export type AccountsMapType = Map<
  AccountPropertiesType["id"],
  AccountPropertiesType
>;
