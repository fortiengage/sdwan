This README file includes the explanation of each field in the CSV file. 
 
General 
1). Don't change the title of each field, only update based on your device information.
2). Copy the sample file and modify it accordingly.
3). You can add a new column to the CSV file with any device-specific attribute. You can use the new field as variable with format "device.new_attribute" in the pre-run.j2 script.
4). The CSV file supports deploying mixed HA and non-HA Branch and Hub; 
5). The field names that starts with "HA" are HA-related fields; Please leave them empty if it's a non-HA branch

Explanation of each field in this CSV file: 
- Serial Number: FortiGate's Serial Number, please always use SN to do the deployment. 
- PSK: Private Security Key, or Password to connect to FortiGate. If the Serial Number is available, leave this field blank. 
- hub_branch: Indicator if this is a Hub or a Branch FortiGate. Please use exactly "Hub" or "Branch".  
- Device Group: Indicator if the Hub or Branch Group name that the FortiGate belongs to. 
               All branches with the same type FortiGate, and same type/number of underlay interfaces should be grouped. 
               i.e. branch_grp_internetx2
                    branch_grp_internet+5G
- Name: FortiGate name, no blank, I.e. branch_vancouver 
- OS Version: FortiOS GA build release number, please always use three-digit release number,  i.e. 7.6.4, 8.0.1 
- Split Port: Indicator to split the port from the virtual switch, usually it needs to split the port
- isp_intf: This is a combined underlay interface name field. It can support up to 4 different kinds of interfaces.
            It's in JSON format. It provided the flexibility to support two to four different types of underlay interfaces. 
            It supports four type of underlay interfaces: physical, aggregate/LACP, redundant and VLAN interfaces. 
    The following are examples; please copy and modify accordingly. 
    1. Physical Interface
       Static: { "name": "port1", "type": "physical", "mode": "static", "ip": "10.15.1.2", "network_mask": "255.255.255.0", "gateway": "10.15.1.1" }
         DHCP: { "name": "port1", "type": "physical", "mode": "dhcp" }
    2. Aggregate/LACP interface
       Static: { "name": "agg1", "type": "aggregate", "mode": "static", "ip": "10.15.1.2", "network_mask": "255.255.255.0", "ports": ["port1", "port2"], "gateway": "10.15.1.1" }
         dhcp: { "name": "agg1", "type": "aggregate", "mode": "dhcp", "ports": ["port1", "port2"] }
    3. redundant interface
       Static: { "name": "red1", "type": "redundant", "mode": "static", "ip": "10.15.1.2", "network_mask": "255.255.255.0", "ports": ["port1", "port2"], "gateway": "10.15.1.1" }
         dhcp: { "name": "red1", "type": "redundant", "mode": "dhcp", "ports": ["port1", "port2"] }
    4. VLAN interface
       static: { "name": "vlan1", "type": "vlan", "mode": "static", "ip": "10.15.1.2", "network_mask": "255.255.255.0", "ports": ["port1"], "gateway": "10.15.1.1", "vlan_id": "100" }
         dhcp: { "name": "vlan1", "type": "vlan", "mode": "dhcp", "ports": ["port1"], "vlan_id": "100" }


The following field is for support HA Branch or Hub only:
- HA: Y or N; Please set to N if it's not HA. 
- HA_Cluster_ID: HA cluster ID
- HA_Cluster_Name: HA cluster Name
- HA_Password: HA password
- HA_Primary_Priority: HA primary priority
- HA_Secondary_SN: HA Secondary series number 
- HA_Priority: HA Secondary Priority
- HA_Monitoring_Intf: HA monitoring interface, i.e. "port4,port5"
- HA_HB_Intf: HA heart-beat interface, {port,priority; port,priority}, i.e. "port6,0;port7,0"

The following optional fields are used to configure the management interfaces' IP address and static route for FortiManager to connect to the FortiGates:
- mgmt_intf_name: Management interface name
- mgmt_intf_ip: Management interface ip
- mgmt_dst_fmg_ip_networkmask: used as dst in static route setting 
- mgmt_dst_gateway_ip: use as "gateway" in static route setting 

The following optional fields are used to identify the location of each FortiGate/Branch.
Please use google map to find the city's longitude and altitude where the FortiGate is located. 
FortiManager will use these info to display the FortiGate/Branch on a map on the SD-WAN monitoring page.
- longitude 
- latitude


