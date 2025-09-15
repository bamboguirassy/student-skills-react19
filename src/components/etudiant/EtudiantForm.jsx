import { useState } from "react";
import { Card, Form, Input, DatePicker, Button, Row, Col, Alert, Typography } from "antd";
import dayjs from "dayjs";
import api from "../../services/axios";

const { Title } = Typography;

function EtudiantForm({ onCreate }) {
  const [form] = Form.useForm();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Validation personnalisée (exemple : nom longueur mini)
  const validateNomMinLen = (_, value) => {
    if (!value || value.trim().length >= 2) return Promise.resolve();
    return Promise.reject(new Error("Le nom doit contenir au moins 2 caractères."));
  };

  // (Optionnel facile à ajuster) Vérifier que la date est une date valide passée
  const validateDateNaissance = (_, value) => {
    if (!value) return Promise.reject(new Error("La date de naissance est requise."));
    const d = dayjs(value);
    if (!d.isValid()) return Promise.reject(new Error("Date invalide."));
    if (d.isAfter(dayjs(), "day")) return Promise.reject(new Error("La date ne peut pas être future."));
    return Promise.resolve();
  };

  const handleFinish = async (values) => {
    setPending(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        nom: values.nom.trim(),
        email: values.email.trim(),
        date_naissance: values.date_naissance.toISOString(), // dayjs → ISO string
        createdAt: new Date().toISOString(),
      };

      const res = await api.post("/etudiants", payload);
      const created = res.data;

      setSuccess("Étudiant créé avec succès ✅");
      form.resetFields(); // clear UI
      if (typeof onCreate === "function") onCreate(created);
    } catch (err) {
      console.error(err);
      setError("Échec de la création de l’étudiant. Réessayez.");
    } finally {
      setPending(false);
    }
  };

  const handleFinishFailed = () => {
    setError("Veuillez corriger les erreurs du formulaire.");
  };

  return (
    <Card>
      <Title level={2} style={{ marginTop: 0 }}>Ajouter un étudiant</Title>

      {success && (
        <Alert type="success" message={success} showIcon style={{ marginBottom: 12 }} />
      )}
      {error && (
        <Alert type="error" message={error} showIcon style={{ marginBottom: 12 }} />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        // Valeurs initiales si besoin :
        initialValues={{
          nom: "",
          email: "",
          date_naissance: null,
        }}
        requiredMark="optional"
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nom"
              name="nom"
              rules={[
                { required: true, message: "Le nom est requis." },
                { validator: validateNomMinLen },
              ]}
            >
              <Input placeholder="Ex. Amina Diop" allowClear />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "L’email est requis." },
                { type: "email", message: "Adresse email invalide." },
              ]}
            >
              <Input placeholder="amina@example.com" allowClear />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Date de naissance"
              name="date_naissance"
              rules={[{ validator: validateDateNaissance }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Sélectionner une date"
                // format d’affichage; la valeur reste un objet dayjs
                format="YYYY-MM-DD"
                // désactiver les dates futures (UX)
                disabledDate={(current) => current && current > dayjs().endOf("day")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={pending}>
            {pending ? "Création en cours…" : "Créer l’étudiant"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default EtudiantForm;