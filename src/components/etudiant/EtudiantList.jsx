import { Link } from "react-router-dom";
import { List, Avatar, Typography, Button, Empty, Popconfirm, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function EtudiantList({ etudiants, onEdit, onDelete, deletingId }) {
    
    // État vide → composant Empty d’Antd
    if (!etudiants || etudiants.length === 0) {
        return <Empty description="Aucun étudiant pour le moment." />;
    }

    return (
        <div>
            <Title level={2} style={{ marginTop: 0 }}>Liste des étudiants</Title>

            <List
                itemLayout="horizontal"
                dataSource={etudiants}
                rowKey={(e) => e.id}
                renderItem={(e) => (
                    <List.Item
                        // Zone d’actions à droite
                        actions={[
                            // Détails → on garde react-router <Link>, stylé avec un Button "link"
                            <Button type="link" key="details">
                                <Link to={`/etudiants/${e.id}`} title="Voir la fiche de l’étudiant">
                                    Voir détails
                                </Link>
                            </Button>,

                            // Modifier (seulement si onEdit est fourni)
                            onEdit && (
                                <Button key="edit" onClick={() => onEdit(e)}>
                                    Modifier
                                </Button>
                            ),

                            // Supprimer (désactivé pendant la suppression en cours)
                            <Popconfirm
                                key="delete"
                                title="Confirmer la suppression"
                                description={`Supprimer ${e.nom} ? Cette action est irréversible.`}
                                okText="Supprimer"
                                cancelText="Annuler"
                                okButtonProps={{ danger: true, loading: deletingId === e.id }}
                                onConfirm={() => onDelete?.(e)}
                                onCancel={() => message.info("Suppression annulée.")}
                            >
                                <Button danger disabled={deletingId === e.id}>
                                    {deletingId === e.id ? "Suppression…" : "Supprimer"}
                                </Button>
                            </Popconfirm>,
                        ].filter(Boolean)}
                    >
                        <List.Item.Meta
                            avatar={
                                e.avatar ? (
                                    <Avatar src={e.avatar} alt={e.nom} />
                                ) : (
                                    <Avatar icon={<UserOutlined />} />
                                )
                            }
                            title={<Text strong>{e.nom}</Text>}
                            description={
                                e.email ? <Text type="secondary">{e.email}</Text> : null
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default EtudiantList;