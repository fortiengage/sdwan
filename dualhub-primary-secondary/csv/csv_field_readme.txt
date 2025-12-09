

Serial Number,PSK,hub_branch,Device Group,Name,OS Version,Device Type,Split Port,HA,HA_Cluster_ID,HA_Cluster_Name,HA_Password,HA_Primary_Priority,HA_Secondary_SN,HA_Priority,HA_Monitoring_Intf,HA_HB_Intf,isp_intf,mgmt_intf_name,mgmt_dst_gateway_ip,mgmt_dst_fmg_ip_networkmask

Note: 
General 
1). Don't change the title of each field, only update based on your device information.
2). Copy the sample file and modify it accordingly.
3). You can add a new column to the CSV file with any device-specific attribute. You can use the new field as variable with format "device.new_attribute" in the pre-run.j2 script.
4). The CSV file supports deploying mixed HA and non-HA Branch and Hub; 
5). The field names that starts with "HA" are HA-related fields; Please leave them empty if it's a non-HA branch

Explanation of each field in this CSV file: 
- Serial Number: FortiGate's Serial Number. 
- PSK: Private Security Key, or Password to connect to FortiGate. If Serial Number is available, leave this field blank. 
- hub_branch: Indicator if this is a Hub or a Branch FortiGate. Please use exactly "Hub" or "Branch".  
- Device Group: Inidator if this FortiGate belongs to Hub or Branch Group, please use exactly "hub_grp" or "branch_grp" 
- Name: FortiGate name, no blank, I.e. branch_vancouver_1st_floor 
- OS Version: FortiOS GA build release number, I.e. 7.6.4, 8.0.1 
- Split Port: Indicator to split the port from the virtual switch 
- isp1_intf_name: the interface name that is connected to the internet, it's needed for the Hub.  
- isp1_intf_ip: the IP address 
- isp1_gateway: the IP address of the gateway 
- isp2_intf_name: the interface name that is connected to the internet, it's needed for the Hub.  
- isp2_intf_ip: the IP address 
- isp1_gateway: the IP address of the gateway 
- lan_intf_name: Local LAN interface name 
- lan_intf_ip: Local LAN interface IP 
- isp1_intf_ip: the IP address 
- lan_intf_network_mask: Local LAN interface network mask 
- hostname: FortiGate hostname, make it the same as "name" 

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

The following three field is used to config a static route for FortiManager to connect to the fortiGates. 
- mgmt_intf_name: Management interface name to connect to fortiManager 
- mgmt_dst_fmg_ip_networkmask: used as dst in static route setting 
- mgmt_dst_gateway_ip: use as "gateway" in static route setting 

Different types of underlay interfaces:
1. Physical Interface
   Static: { "name": "port1", "type": "physical", "ip": "10.15.1.2", "network_mask": "255.255.255.0", "gateway": "10.15.1.1", "mode": "static", "vdom": "root", "role": "wan" }
     DHCP: { "name": "port1", "type": "physical", "mode": "dhcp", "vdom": "root", "role": "wan" }
2. Aggregate/LACP interface
   Static: { "name": "agg1", "type": "aggregate", "ip": "10.17.1.2", "network_mask": "255.255.255.0", "ports": ["port1", "port2"], "gateway": "10.17.1.1", "mode": "static", "vdom": "root", "role": "wan" }
     dhcp: { "name": "agg1", "type": "aggregate", "ports": ["port1", "port2"], "mode": "dhcp", "vdom": "root", "role": "wan" }
3. redundant interface
   Static: { "name": "red1", "type": "redundant", "ip": "10.17.1.2", "network_mask": "255.255.255.0", "ports": ["port1", "port2"], "gateway": "10.17.1.1", "mode": "static", "vdom": "root", "role": "wan" }
     dhcp: { "name": "red1", "type": "redundant", "ports": ["port1", "port2"], "mode": "dhcp", "vdom": "root", "role": "wan" }
4. VLAN interface
   static: { "name": "vlan1", "type": "vlan", "ip": "10.17.1.2", "network_mask": "255.255.255.0", "ports": ["port1"], "gateway": "10.17.1.1", "mode": "static", "vdom": "root", "vlan_id": "100", "role": "wan" }
     dhcp: { "name": "vlan1", "type": "vlan", "ports": ["port1"], "mode": "dhcp", "vdom": "root", "vlan_id": "100", "role": "wan" }
