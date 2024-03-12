import { PlanDataAPI } from "@/components/form/types/plans";
import { api } from "@/services/api";
import { caveat } from "@/styles/fonts";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import classNames from "classnames";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export default function PrintPlan({ plan }: { plan: PlanDataAPI }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
    },

    titleContainer: {
      backgroundColor: "#991B1B",
      padding: "16px 0px",
      borderBottomRightRadius: "8px",
      borderBottomLeftRadius: "8px",
    },
    title: {
      fontSize: "24px",
      textAlign: "center",
      color: "#F9FAFB",
    },

    planTitleContainer: {
      paddingTop: "16px",
      alignItems: "center",
    },

    planTitle: {
      fontWeight: "bold",
      fontSize: "24px",
    },

    planDescriptionContainer: {
      paddingHorizontal: "16px",
      paddingTop: "16px",
    },

    planDescription: {
      fontWeight: "light",
    },

    planParticipantsContainer: {
      paddingTop: "16px",
    },
  });

  const [nodes, setNodes] = useState(<></>);

  useEffect(() => {
    setNodes(
      <>
        <h2
          className={classNames(
            "text-center text-3xl font-bold",
            caveat.className,
          )}
        >
          Print Your Plan!
        </h2>
        <PDFViewer height="100%" className="h-[80vh]" width="100%">
          <Document title={plan.title} subject={plan.description}>
            <Page size="A4" style={styles.page}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Buzzplans</Text>
              </View>

              <View style={styles.planTitleContainer}>
                <Text style={styles.planTitle}>{plan.title}</Text>
              </View>

              <View style={styles.planDescriptionContainer}>
                <Text style={styles.planDescription}>
                  Description: {plan.description}
                </Text>
              </View>

              <View style={styles.planDescriptionContainer}>
                <Text style={styles.planDescription}>
                  Where: {plan.location}
                </Text>
              </View>

              <View style={styles.planDescriptionContainer}>
                <Text style={styles.planDescription}>
                  Start date:{" "}
                  {new Date(plan.startDate).toLocaleString(undefined, {
                    dateStyle: "short",
                  })}
                </Text>

                <View style={styles.planParticipantsContainer}>
                  <Text style={styles.planDescription}>
                    End date:{" "}
                    {new Date(plan.endDate).toLocaleString(undefined, {
                      dateStyle: "short",
                    })}
                  </Text>
                </View>

                {plan.participants && (
                  <View style={styles.planParticipantsContainer}>
                    <Text style={styles.planDescription}>
                      Participants: {plan.participants}
                    </Text>
                  </View>
                )}
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </>,
    );
  }, []);

  return nodes;
}

export const getServerSideProps = (async (context) => {
  const res = await api({ action: "fetch", id: context.query.id as string });
  const plan: PlanDataAPI = await res.json();

  return { props: { plan } };
}) satisfies GetServerSideProps<{ plan: PlanDataAPI }>;
