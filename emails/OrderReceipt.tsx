import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Items } from "mercadopago/dist/clients/commonTypes";
import * as React from "react";

interface ClientDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  province: string;
  postal_code: string;
  apartment?: string; // Opcional, basado en el ejemplo proporcionado
}

interface Product {
  category_id: string;
  description: string;
  id: string;
  picture_url: string;
  quantity: string;
  title: string;
  unit_price: string;
}

interface Order {
  id: string;
  clientDetails: ClientDetails;
  products: Items[] | [];
  totalAmountPaid: number; // Campo adicional para el monto total pagado
  date_approved: string;
}

function formatDateString(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options);
}

export const OrderReceipt = ({
  id,
  clientDetails: {
    address,
    province,
    phone,
    last_name,
    postal_code,
    first_name,
    apartment,
    email,
  },
  products,
  totalAmountPaid,
  date_approved,
}: Order) => (
  <Html>
    <Head />
    <Preview>Orden confirmada - Alterego 4K </Preview>

    <Body style={main}>
      <Container style={container}>
        <Section>
          <Row>
            <Column>
              <Text style={heading}>ALTEREGO 4K</Text>
            </Column>

            <Column align="right" style={tableCell}>
              <Text style={heading}>Recibo</Text>
            </Column>
          </Row>
        </Section>{" "}
        <Section>
          <Text style={cupomText}>tu pedido fue confirmado.</Text>
        </Section>
        <Section style={informationTable}>
          <Row style={informationTableRow}>
            <Column colSpan={2}>
              <Section>
                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>Email</Text>
                    <Link
                      style={{
                        ...informationTableValue,
                        color: "#15c",
                        textDecoration: "underline",
                      }}
                    >
                      {email}
                    </Link>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>FECHA</Text>
                    <Text style={informationTableValue}>
                      {formatDateString(date_approved)}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column style={informationTableColumn}>
                    <Text style={informationTableLabel}>ORDER ID</Text>
                    <Link
                      style={{
                        ...informationTableValue,
                        color: "#15c",
                        textDecoration: "underline",
                      }}
                    >
                      {id}
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Column>
            <Column style={informationTableColumn} colSpan={2}>
              <Text style={informationTableLabel}>Detalles</Text>
              <Text style={informationTableValue}>Nombre: {first_name}</Text>
              <Text style={informationTableValue}>Apellido: {last_name}</Text>
              <Text style={informationTableValue}>Cel: {phone}</Text>
              <Text style={informationTableValue}>
                Domicilio: {province}, {address}
              </Text>
              {apartment && (
                <Text style={informationTableValue}>
                  Apartamento: {apartment}
                </Text>
              )}
              <Text style={informationTableValue}>
                Codigo postal: {postal_code}
              </Text>
            </Column>
          </Row>
        </Section>
        <Section style={productTitleTable}>
          <Text style={productsTitle}>Productos</Text>
        </Section>
        <Section>
          {products.map(
            ({
              id,
              picture_url,
              quantity,
              title,
              unit_price,
              description,
              category_id,
            }: Items) => (
              <Row key={id}>
                <Column style={{ width: "64px" }}>
                  <Img
                    src={picture_url}
                    width="64"
                    height="64"
                    alt={title}
                    style={productIcon}
                  />
                </Column>
                <Column style={{ paddingLeft: "22px" }}>
                  <Text style={productTitle}>{title}</Text>
                  <Text style={productDescription}>
                    {description && description.length > 40
                      ? description.slice(0, 18) + "..."
                      : description}
                  </Text>
                  <Text style={productDescription}>Talle: {category_id}</Text>
                </Column>
                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>
                    {quantity} x ${unit_price} = $
                    {Number(quantity) * Number(unit_price)}
                  </Text>
                </Column>
              </Row>
            )
          )}
        </Section>
        <Hr style={productPriceLine} />
        <Section align="right">
          <Row>
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>TOTAL</Text>
            </Column>
            <Column style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>{totalAmountPaid}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={productPriceLineBottom} />
        <Text style={footerCopyright}>
          Copyright © 2024 Alter Ego 4k. <br />{" "}
          <Link href="https://www.alterego.com.ar">All rights reserved</Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default OrderReceipt;

OrderReceipt.PreviewProps = {
  id: "order123",
  clientDetails: {
    address: "Palermo 1234",
    province: "Buenos Aires",
    phone: "1234567890",
    last_name: "Dom",
    postal_code: "b7400",
    first_name: "Jacob",
    apartment: "2w", // Opcional
    email: "jacob@gmail.com",
  },
  products: [
    {
      category_id: "M",
      description:
        "La Varsity Retro te lleva de vuelta al estilo clásico con un giro moderno. Azul brillante y gráficos audaces, unisex y versátil.",
      id: "prod1",
      picture_url:
        "https://i.pinimg.com/564x/3c/0c/bf/3c0cbf27f171f72dd63cda7687ef7169.jpg",
      quantity: 2,
      title: "Varsity Retro",
      unit_price: 50,
    },
    {
      category_id: "L",
      description:
        "Camiseta deportiva de alta calidad, perfecta para cualquier actividad física.",
      id: "prod2",
      picture_url:
        "https://i.pinimg.com/564x/bb/86/d4/bb86d4ea2aecbdbffc4962725002529c.jpg",
      quantity: 1,
      title: "Camiseta Deportiva",
      unit_price: 30,
    },
  ],
  totalAmountPaid: 130, // 2 * 50 + 1 * 30
  date_approved: "2024-07-12T17:33:18.000-04:00",
} as Order;

const main = {
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const cupomText = {
  textAlign: "center" as const,
  margin: "36px 0 40px 0",
  fontSize: "14px",
  fontWeight: "500",
  color: "#111111",
};

const supStyle = {
  fontWeight: "300",
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const informationTableRow = {
  height: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgba(128,128,128,0.2)",
};

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

const productLink = {
  fontSize: "12px",
  color: "rgb(0,112,201)",
  textDecoration: "none",
};

const divisor = {
  marginLeft: "4px",
  marginRight: "4px",
  color: "rgb(51,51,51)",
  fontWeight: 200,
};

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "top",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const productPriceLineBottom = { margin: "0 0 75px 0" };

const block = { display: "block" };

const ctaTitle = {
  display: "block",
  margin: "15px 0 0 0",
};

const ctaText = { fontSize: "24px", fontWeight: "500" };

const walletWrapper = { display: "table-cell", margin: "10px 0 0 0" };

const walletLink = { color: "rgb(0,126,255)", textDecoration: "none" };

const walletImage = {
  display: "inherit",
  paddingRight: "8px",
  verticalAlign: "middle",
};

const walletBottomLine = { margin: "65px 0 20px 0" };

const footerText = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "0",
  lineHeight: "auto",
  marginBottom: "16px",
};

const footerTextCenter = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  margin: "20px 0",
  lineHeight: "auto",
  textAlign: "center" as const,
};

const footerLink = { color: "rgb(0,115,255)" };

const footerIcon = { display: "block", margin: "40px 0 0 0" };

const footerLinksWrapper = {
  margin: "8px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

const footerCopyright = {
  margin: "25px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

const walletLinkText = {
  fontSize: "14px",
  fontWeight: "400",
  textDecoration: "none",
};
