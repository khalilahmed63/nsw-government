## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.


# Dashboard

mock urls

devices counts
https://run.mocky.io/v3/2abacc09-f3e3-420d-84bc-60e180c559fc
real url
https://iot-capability.azure-api.net/iot-capability-devices/devices?count=true

{
    "count": {
        "devices": {
            "total": 4373,
            "online": 4373,
            "offline": 4373
        }
    }
}

projects counts
https://run.mocky.io/v3/f54a4371-065c-4ead-a705-d1d0f63ff51c
real url
https://iot-capability.azure-api.net/iot-capability-projects/projects?count=true

{
    "count": {
        "projects": {
            "total": 4373
        }
    }
}

vendors counts
https://run.mocky.io/v3/f3956111-fd56-47b6-9008-49ba1423fae2
real url
https://iot-capability.azure-api.net/iot-capability-vendors/vendors?count=true

{
    "count": {
        "vendors": {
            "total": 32
        }
    }
}

devicegroups counts
https://run.mocky.io/v3/a9e4db24-2a11-4f9a-b3c0-9fd8437239e8
real url
https://iot-capability.azure-api.net/iot-capability-devicegroups/devicegroups?count=true

{
    "count": {
        "deviceGroups": {
            "total": 10
        }
    }
}

issues counts
https://run.mocky.io/v3/3c9361f0-8d06-435a-9ec1-104bd8992eea
real url
https://iot-capability.azure-api.net/iot-capability-issues/issues?count=true

{
    "count": {
        "issues": {
            "total": 18,
            "p1": 7,
            "p2": 6,
            "p3": 5
        }
    }
}


activites counts
https://run.mocky.io/v3/9ee27219-2044-49f1-b801-89f9f39a887f
real url
https://iot-capability.azure-api.net/iot-capability-activites/activites?dehydrate=false

{
    "count": {
        "activites": {
            "total": 187,
            "devices": 106,
            "device_group": 81,
        }
    },
    "activites": [
        {
            "type": "device_online",
            "message": "New Device Online",
            "timestamp": "2019-09-26T07:58:30.996+0200",
        },
        {
            "type": "device_offline",
            "message": "New Device Offline",
            "timestamp": "2019-09-26T07:58:30.996+0200",
        },
        {
            "type": "device_group_added",
            "message": "New Device Model Added",
            "timestamp": "2019-09-26T07:58:30.996+0200",
        },
    ]
}

# Projects

projects counts
https://run.mocky.io/v3/f54a4371-065c-4ead-a705-d1d0f63ff51c
real url
https://iot-capability.azure-api.net/iot-capability-projects/projects?count=true

{
    "count": {
        "projects": {
            "total": 4373
        }
    }
}

First call
https://iot-capability.azure-api.net/iot-capability-projects/projects?page=0&limit=20

End of Page 
First call
https://iot-capability.azure-api.net/iot-capability-projects/projects?page=20&limit=20

...
Subsequent call 
https://iot-capability.azure-api.net/iot-capability-projects/projects?page=40&limit=20


Filters

Vendors

https://run.mocky.io/v3/b86dd69c-5ea2-46fd-b3f0-006e6bd2bafb
