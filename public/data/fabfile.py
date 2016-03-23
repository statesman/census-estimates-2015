import csv


# whang county data into national/state/tx files
def getCounties():
    """
    Headers
    =======
    SUMLEV,REGION,DIVISION,STATE,COUNTY,STNAME,CTYNAME,CENSUS2010POP,ESTIMATESBASE2010,POPESTIMATE2010,POPESTIMATE2011,POPESTIMATE2012,POPESTIMATE2013,POPESTIMATE2014,POPESTIMATE2015,NPOPCHG_2010,NPOPCHG_2011,NPOPCHG_2012,NPOPCHG_2013,NPOPCHG_2014,NPOPCHG_2015,BIRTHS2010,BIRTHS2011,BIRTHS2012,BIRTHS2013,BIRTHS2014,BIRTHS2015,DEATHS2010,DEATHS2011,DEATHS2012,DEATHS2013,DEATHS2014,DEATHS2015,NATURALINC2010,NATURALINC2011,NATURALINC2012,NATURALINC2013,NATURALINC2014,NATURALINC2015,INTERNATIONALMIG2010,INTERNATIONALMIG2011,INTERNATIONALMIG2012,INTERNATIONALMIG2013,INTERNATIONALMIG2014,INTERNATIONALMIG2015,DOMESTICMIG2010,DOMESTICMIG2011,DOMESTICMIG2012,DOMESTICMIG2013,DOMESTICMIG2014,DOMESTICMIG2015,NETMIG2010,NETMIG2011,NETMIG2012,NETMIG2013,NETMIG2014,NETMIG2015,RESIDUAL2010,RESIDUAL2011,RESIDUAL2012,RESIDUAL2013,RESIDUAL2014,RESIDUAL2015,GQESTIMATESBASE2010,GQESTIMATES2010,GQESTIMATES2011,GQESTIMATES2012,GQESTIMATES2013,GQESTIMATES2014,GQESTIMATES2015,RBIRTH2011,RBIRTH2012,RBIRTH2013,RBIRTH2014,RBIRTH2015,RDEATH2011,RDEATH2012,RDEATH2013,RDEATH2014,RDEATH2015,RNATURALINC2011,RNATURALINC2012,RNATURALINC2013,RNATURALINC2014,RNATURALINC2015,RINTERNATIONALMIG2011,RINTERNATIONALMIG2012,RINTERNATIONALMIG2013,RINTERNATIONALMIG2014,RINTERNATIONALMIG2015,RDOMESTICMIG2011,RDOMESTICMIG2012,RDOMESTICMIG2013,RDOMESTICMIG2014,RDOMESTICMIG2015,RNETMIG2011,RNETMIG2012,RNETMIG2013,RNETMIG2014,RNETMIG2015
    """
    with open("CO-EST2015-alldata.csv", "rb") as infile, open("us_county_pop_2015.csv", "wb") as usfile, open("tx_county_pop_2015.csv", "wb") as txfile:
        headers = [
            "statefips",
            "countyfips",
            "state",
            "county",
            "pop10",
            "pop11",
            "pop12",
            "pop13",
            "pop14",
            "pop15"
        ]

        h = ",".join(headers)
        usfile.write(h + "\n")
        txfile.write(h + "\n")

        reader = csv.reader(infile, delimiter=",")
        reader.next()

        for row in reader:
            statefips = row[3]
            countyfips = row[4]
            state = row[5]
            county = row[6]
            estimate10 = row[9]
            estimate11 = row[10]
            estimate12 = row[11]
            estimate13 = row[12]
            estimate14 = row[13]
            estimate15 = row[14]

            r = [
                statefips,
                countyfips,
                state,
                county,
                estimate10,
                estimate11,
                estimate12,
                estimate13,
                estimate14,
                estimate15,
            ]

            usfile.write(",".join(r) + "\n")
            if state.upper() == "TEXAS":
                txfile.write(",".join(r) + "\n")


# whang MSA data into us/texas files
def getMSA():
    """
    CBSA,MDIV,STCOU,NAME,LSAD,CENSUS2010POP,ESTIMATESBASE2010,POPESTIMATE2010,POPESTIMATE2011,POPESTIMATE2012,POPESTIMATE2013,POPESTIMATE2014,POPESTIMATE2015,NPOPCHG2010,NPOPCHG2011,NPOPCHG2012,NPOPCHG2013,NPOPCHG2014,NPOPCHG2015,BIRTHS2010,BIRTHS2011,BIRTHS2012,BIRTHS2013,BIRTHS2014,BIRTHS2015,DEATHS2010,DEATHS2011,DEATHS2012,DEATHS2013,DEATHS2014,DEATHS2015,NATURALINC2010,NATURALINC2011,NATURALINC2012,NATURALINC2013,NATURALINC2014,NATURALINC2015,INTERNATIONALMIG2010,INTERNATIONALMIG2011,INTERNATIONALMIG2012,INTERNATIONALMIG2013,INTERNATIONALMIG2014,INTERNATIONALMIG2015,DOMESTICMIG2010,DOMESTICMIG2011,DOMESTICMIG2012,DOMESTICMIG2013,DOMESTICMIG2014,DOMESTICMIG2015,NETMIG2010,NETMIG2011,NETMIG2012,NETMIG2013,NETMIG2014,NETMIG2015,RESIDUAL2010,RESIDUAL2011,RESIDUAL2012,RESIDUAL2013,RESIDUAL2014,RESIDUAL2015
    """
    with open("CBSA-EST2015-alldata.csv", "rb") as infile, open("us_msa_pop_2015.csv", "wb") as natfile, open("tx_msa_pop_2015.csv", "wb") as txfile:

        reader = csv.reader(infile, delimiter=",")
        reader.next()

        h = [
            "msa",
            "pop10",
            "pop11",
            "pop12",
            "pop13",
            "pop14",
            "pop15"
        ]

        natfile.write(",".join(h) + "\n")
        txfile.write(",".join(h) + "\n")

        for row in reader:
            name = row[3].replace("--", "-")
            geo_type = row[4]
            est10 = row[7]
            est11 = row[8]
            est12 = row[9]
            est13 = row[10]
            est14 = row[11]
            est15 = row[12]

            if geo_type.upper() == "METROPOLITAN STATISTICAL AREA":
                r = [
                    '"' + name + '"',
                    est10,
                    est11,
                    est12,
                    est13,
                    est14,
                    est15,
                ]

                natfile.write(",".join(r) + "\n")

                if "TX" in name:
                    txfile.write(",".join(r) + "\n")
