/**
 * SchemaMarkup Component
 * A reusable component for injecting JSON-LD structured data into pages
 */

interface SchemaMarkupProps {
  schema: Record<string, any>;
  id?: string;
}

export function SchemaMarkup({ schema, id = "schema-markup" }: SchemaMarkupProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

/**
 * Multiple Schema Component
 * For injecting multiple schema contexts into a single page
 */
interface MultiSchemaMarkupProps {
  schemas: Array<{
    schema: Record<string, any>;
    id?: string;
  }>;
}

export function MultiSchemaMarkup({ schemas }: MultiSchemaMarkupProps) {
  return (
    <>
      {schemas.map((item, index) => (
        <SchemaMarkup
          key={item.id || `schema-${index}`}
          schema={item.schema}
          id={item.id || `schema-${index}`}
        />
      ))}
    </>
  );
}
