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
    <Preview>Orden confirmada - alterego4K </Preview>

    <Body style={main}>
      <Container style={container}>
        <Section style={{ textAlign: "center" }}>
          <Img
            src="https://h4bobk3u5rd9ijmz.public.blob.vercel-storage.com/alteregologo-j5l2hI36LGg70yRivvKbneTxWstPvL.png"
            width="114"
            alt="Logo"
            style={{ display: "inline-block" }}
          />
        </Section>
        <Section>
          <Text style={cupomText}>
            Tu pedido fue <strong>confirmado.</strong>
          </Text>
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
                  <Text style={productTitle}>{description}</Text>
                  <Text style={productDescription}>
                    {title && title.length > 40
                      ? title.slice(0, 18) + "..."
                      : title}
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
        <Text style={thanks}>
          <strong>
            Apenas se realice el envío te llegará un mail con el código de
            seguimiento.
            <br />
          </strong>
          Gracias por tu compra.
        </Text>
        <Row
          style={{
            margin: "10px 0 0 0",
          }}
        >
          <Column
            align="right"
            style={{ width: "50px", paddingRight: "8px", opacity: 0 }}
          >
            <Link href="https://www.instagram.com/alterego4k/">
              <Img
                src={
                  "https://cdn-icons-png.flaticon.com/256/15713/15713420.png"
                }
                style={{ width: "24px", height: "24px" }} // Adjust size here
              />
            </Link>
          </Column>
          <Column
            align="left"
            style={{ width: "50px", paddingLeft: "8px", opacity: 0 }}
          >
            <Link href="https://wa.me/5492646274890?text=Hola%20quiero%20hacer%20una%20consulta">
              <Img
                src={"https://cdn-icons-png.flaticon.com/256/5968/5968841.png"}
                style={{ width: "24px", height: "24px" }} // Adjust size here
              />
            </Link>
          </Column>
          <Column align="right" style={{ width: "50px", paddingRight: "8px" }}>
            <Link href="https://www.instagram.com/alterego4k/">
              <Img
                src={
                  "https://cdn-icons-png.flaticon.com/256/15713/15713420.png"
                }
                style={{ width: "24px", height: "24px" }} // Adjust size here
              />
            </Link>
          </Column>
          <Column align="left" style={{ width: "50px", paddingLeft: "8px" }}>
            <Link href="https://wa.me/5492646274890?text=Hola%20quiero%20hacer%20una%20consulta">
              <Img
                src={"https://cdn-icons-png.flaticon.com/256/5968/5968841.png"}
                style={{ width: "24px", height: "24px" }} // Adjust size here
              />
            </Link>
          </Column>
          <Column
            align="right"
            style={{ width: "50px", paddingRight: "8px", opacity: 0 }}
          >
            <Link href="https://www.instagram.com/alterego4k/">
              <Img
                src={
                  "https://cdn-icons-png.flaticon.com/256/15713/15713420.png"
                }
                style={{ width: "24px", height: "24px" }} // Adjust size here
              />
            </Link>
          </Column>
          <Column
            align="left"
            style={{ width: "50px", paddingLeft: "8px", opacity: 0 }}
          >
            <Link href="https://wa.me/5491170606302?text=Hola%20quiero%20hacer%20una%20consulta">
              <Img
                src={"https://cdn-icons-png.flaticon.com/256/5968/5968841.png"}
                style={{ width: "24px", height: "24px" }} // Adjust size here
              />
            </Link>
          </Column>
        </Row>
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

const cupomText = {
  textAlign: "center" as const,
  margin: "36px 0 40px 0",
  fontSize: "14px",
  fontWeight: "500",
  color: "#111111",
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

const productPriceLineBottom = { margin: "0 0 25px 0" };

const thanks = {
  margin: "0 0 20px 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};
