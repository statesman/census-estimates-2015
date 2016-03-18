import csv

# csvcut -c STATE,COUNTY,STNAME,CTYNAME,CENSUS2010POP,POPESTIMATE2014 -e "iso-8859-1" test.csv | csvformat -D "|" > slim.csv
def get_rate(infile, outfile, new_col, old_col, delim, countyfp, headers=True):
    head = [
        "statefp",
        "countyfp",
        "statename",
        "countyname",
        "pop2010",
        "pop2015",
        "rate"
    ]
    with open(infile, "rb") as ifile, open(outfile, "wb") as ofile:
        ofile.write(",".join(head) + "\n")
        reader = csv.reader(ifile, delimiter=delim)
        if headers:
            reader.next()
        for row in reader:
            # skip state totals
            if row[int(countyfp)] != "000":
                new = float(row[int(new_col)])
                old = float(row[int(old_col)])
                rate = str((new - old) / old)
                row.append(rate)
                ofile.write(",".join(row) + "\n")
