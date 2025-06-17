


cli.j2: Configure the managing interface on FortiGate, i.e. IP address, allowcase, and dhcp. 
    The CLI is to config the DHCP server which is used to provide IP address to FAP which connects to the managing interface.
    1). The default-gateway is the IP address of the managing interface.
    2). The ip-range will be from the next available IP to 254 calculated based on the network mask, e.g. WC_FGT_PORT_IP is 10.10.9.1, the ip-range will be 10.10.9.2 to 10.10.9.254.
    3). The FortiEngage will dynamically calculate the IP range based on the IP address of the managing interface. 
