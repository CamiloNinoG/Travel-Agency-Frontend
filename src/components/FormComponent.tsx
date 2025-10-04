// FormComponent.tsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import SelectField from "./SelectField"; // 👈 Asegúrate de importar el componente

interface MyFormProps {
  mode: number;
  handleCreate?: (values: any) => void;
  handleUpdate?: (values: any) => void;
  object?: any | null;
  initialValuesProps?: any;
  validetionSchemaProps: () => any;
  labels: any;
}

const FormComponent: React.FC<MyFormProps> = ({
  mode,
  handleCreate,
  handleUpdate,
  object,
  initialValuesProps,
  validetionSchemaProps,
  labels,
}) => {
  const handleSubmit = (formattedValues: any) => {
    if (mode === 1 && handleCreate) {
      handleCreate(formattedValues);
    } else if (mode === 2 && handleUpdate) {
      handleUpdate(formattedValues);
    } else {
      console.error("No function provided for the current mode");
    }
  };

  return (
    <Formik
      initialValues={object || initialValuesProps}
      validationSchema={validetionSchemaProps()}
      onSubmit={(values) => {
        const formattedValues = { ...values };
        handleSubmit(formattedValues);
      }}
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-[--card-bg-color] text-[--text-color] p-8 rounded-2xl shadow-xl"
          style={{ backgroundColor: "var(--card-bg-color)", color: "var(--text-color)" }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {mode === 1 ? "Crear Nuevo Registro" : "Actualizar Registro"}
          </h2>

          <div className="space-y-5">
            {labels.map((label: any) => (
              <div key={label.for}>
                {label.type === "select" ? (
                  <SelectField name={label.for} label={label.text} options={label.options} />
                ) : (
                  <>
                    <label htmlFor={label.for} className="block text-sm font-medium mb-1">
                      {label.text}
                    </label>
                    <Field
                      type={label.type}
                      name={label.for}
                      className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[--primary-color] rounded-md px-4 py-2 bg-white"
                    />
                    <ErrorMessage
                      name={label.for}
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 
    ${
      mode === 1
        ? "bg-[--primary-color] hover:bg-[--button-hover] text-white"
        : "bg-[--secondary-color] hover:brightness-90 text-white"
    }`}
              style={{
                backgroundColor: mode === 1 ? "var(--primary-color)" : "var(--secondary-color)",
              }}
            >
              {mode === 1 ? "Crear" : "Actualizar"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
