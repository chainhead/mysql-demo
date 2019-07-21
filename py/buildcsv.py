import sys
import os
import json
import datetime

#
# The JSON file is assumed to have the same number and names of keys in every record of the array.
#

if len(sys.argv[1:]) != 3:
    print 'Invalid number of inputs. USAGE: python buildcsv.py json_file csv_file keys_file'
    sys.exit(8)

json_file = sys.argv[1]
csv_file = sys.argv[2]
keys_file = sys.argv[3]

json_file_path = os.path.join(os.getcwd(), json_file)
csv_file_path = os.path.join(os.getcwd(), csv_file)
keys_file_path = os.path.join(os.getcwd(), keys_file)

if (os.path.exists(json_file_path)):
    pass
else:
    print 'JSON file does not exist.'
    sys.exit(4)

if (os.path.exists(csv_file_path)):
    print 'CSV file already exists.'
    sys.exit(4)

if (os.path.exists(keys_file_path)):
    print 'Keys CSV file already exists.'
    sys.exit(4)

if (os.stat(json_file_path).st_size) == 0:
    print 'Empty JSON file.'
    sys.exit(4)
#
fj = open(json_file_path)
j = json.load(fj)
fj.close()
#
fc = open(csv_file_path, 'w')
#
jsonKeys = ''
for x in j:
    s = ''
    jsonKeys = sorted(x)
    for k in jsonKeys:
        s += str(x[k]) + '|'
        #
    validity = x['validity']
    p = validity.split('-')
    validity_from = p[0]
    validity_to = ''
    if (p[1].strip() == 'Perpetual'):
        validity_to = 'Dec 31, 9999'
    else:
        validity_to = p[1]
        #
    #
    s += validity_from + '|' + validity_to + os.linesep
    fc.write(s)
#
fc.close()
#
fk = open(keys_file_path,'w')
s = ''
for k in jsonKeys:
    s += k + ','
#
s += os.linesep
fk.write(s)
fk.close()